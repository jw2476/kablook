import {Socket} from "socket.io";
import {Game} from "../models/Game";
import {User} from "../models/User";
import sockets from "./sockets";

export default function (socket: Socket) {
    socket.on("join game", async code => {
        const game = await Game.findOne({"code": code}).populate("host")
        const player = await User.findOne({username: socket.data.username})

        socket.emit("join game success")

        if (game.players.includes(player._id)) {
            return
        }

        game.players.push(player)
        await game.save();

        player.currentGame = game._id;
        await player.save()

        const hostSocket = sockets.get(game.host.username)
        hostSocket.emit("user joined", socket.data.username)

    })
}