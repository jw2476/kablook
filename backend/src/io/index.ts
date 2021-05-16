import {Socket} from "socket.io";
import joingame from "./joingame";
import connected from "./connected";
import disconnect from "./disconnect";
import startgame from "./startgame";
import attack from "./attack";

export default function (socket: Socket) {
    attack(socket)
    connected(socket)
    disconnect(socket)
    joingame(socket)
    startgame(socket)
}