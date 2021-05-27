import {Socket} from "socket.io";
import {Game} from "../models/Game";
import sockets from "./sockets";

export default function (socket: Socket) {
    socket.on("start game", async code => {
        const game = await Game.findOne({code: code}).populate("players")

        game.started = true
        await game.save()

        for (const player of game.players) {
            const playerSocket = sockets.get(player.username)
            playerSocket.emit("start game")
        }
    })
}