import {Socket} from "socket.io";
import {User} from "../models/User";
import {Game} from "../models/Game";
import sockets from "./sockets";

type Attack = {
    actionCharge: number,
    username?: string
}

export default (socket: Socket) => {
    socket.on("attack", async (attack: Attack) => {
        const player = await User.findOne({username: socket.data.username})
        player.actionCharge = attack.actionCharge
        await player.save()

        const game = await Game.findOne({_id: player.currentGame}).populate("players").populate("host")
        game.finished++
        await game.save()

        const hostSocket = sockets.get(game.host.username)
        attack.username = socket.data.username
        hostSocket.emit("attack", attack)
        hostSocket.emit("player finished", game.finished / game.players.length)

        for (const player of game.players) {
            const playerSocket = sockets.get(player.username)
            playerSocket.emit("player finished", game.finished / game.players.length)

            if (game.finished === game.players.length) {
                playerSocket.emit("round over")
            }
        }

        if (game.finished === game.players.length) {
            hostSocket.emit("round over")
            game.finished = 0
            await game.save()
        }
    })
}