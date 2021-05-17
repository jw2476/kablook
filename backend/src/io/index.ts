import {Socket} from "socket.io";
import joingame from "./joingame";
import connected from "./connected";
import disconnect from "./disconnect";
import startgame from "./startgame";

export default function (socket: Socket) {
    connected(socket)
    disconnect(socket)
    joingame(socket)
    startgame(socket)
}