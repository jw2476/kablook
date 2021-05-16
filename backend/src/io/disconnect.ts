import {Socket} from "socket.io";
import {Game} from "../models/Game";
import {User} from "../models/User";
import sockets from "./sockets";

export default function (socket: Socket) {
    socket.on("disconnect", async () => {
        const user = await User.findOne({username: socket.data.username})
        const hostingGame = await Game.findOne({host: user._id}).populate("players")

        if (hostingGame) {
            for (const player of hostingGame.players) {
                sockets.get(player.username).emit("host disconnected")
            }

            await hostingGame.deleteOne()
        }

        const playingGame = await Game.findOne({players: user._id}).populate("host")

        if (playingGame) {
            const index = playingGame.players.indexOf(user._id);
            if (index > -1) {
                playingGame.players.splice(index, 1);
            }

            const hostSocket = sockets.get(playingGame.host.username)
            hostSocket.emit("user left", user.username)

            await playingGame.save()
        }
    })
}