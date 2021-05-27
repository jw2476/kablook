import {writable} from 'svelte/store';
import {io, Socket} from "socket.io-client";

export const page = writable("home");
export const uuid = writable(localStorage.getItem("uuid"));
export const spell = writable(null)
export const code = writable(null)
export let socket;

uuid.subscribe(uuid => {
    localStorage.setItem("uuid", uuid)

    if (!socket && uuid) {
        socket = io()
        socket.on("connect", () => {
            socket.emit("connected", uuid)
        })

        socket.on("host disconnected", () => {
            page.set("home")
        })

        socket.on("game over", () => {
            page.set("victory")
        })
    }
})