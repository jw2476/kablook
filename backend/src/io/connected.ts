import {Socket} from "socket.io";
import {User} from "../models/User";
import sockets from "./sockets";

export default function (socket: Socket) {
    socket.on("connected", async uuid => {
        const user = await User.findOne({'uuid': uuid})

        socket.data.uuid = uuid
        socket.data.username = user.username

        sockets.set(user.username, socket)
    })
}