import {Socket} from "socket.io";
import {Game} from "../models/Game";
import {User} from "../models/User";
import sockets from "./sockets";

export default function (socket: Socket) {
    socket.on("join game", async code => {
        const game = await Game.findOne({"code": code}).populate("host")
        const player = await User.findOne({username: socket.data.username})
        player.hitPoints = 10
        player.job === "Paladin" ? player.health = 300 : player.health = 200 // Paladins have more health
        player.maxHealth = player.health
        await player.save()

        socket.emit("join game success", game.started)

        if (game.players.includes(player._id)) {
            return
        }

        game.players.push(player)
        await game.save();

        const hostSocket = sockets.get(game.host.username)
        hostSocket.emit("user joined", socket.data.username)
        if (game.started) hostSocket.emit("message", `${player.username} has rejoined the fight!`)

    })
}