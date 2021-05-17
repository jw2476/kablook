import {Request, Response} from "express";
import {User} from "../../models/User";
import {Game} from "../../models/Game";
import sockets from "../../io/sockets";

type PlayerAttack = {
    actionCharge: number,
    uuid: string
}

type HostAttack = {
    actionCharge: number,
    username: string
}

export default async (req: Request, res: Response) => {
    const attack = req.body as PlayerAttack
    const {
        uuid,
        actionCharge
    } = attack

    console.log(attack)
    console.log(attack.uuid)
    console.log(attack.actionCharge)

    const player = await User.findOne({uuid: uuid})
    console.log(uuid)
    console.log(player)
    player.actionCharge = actionCharge
    await player.save()

    const game = await Game.findOne({players: player._id}).populate("host")
    game.finished++
    await game.save()

    const hostSocket = sockets.get(game.host.username)
    hostSocket.emit("attack", {
        username: player.username,
        actionCharge: player.actionCharge
    })

    if (game.finished === game.players.length) { // Round over
        game.finished = 0
        await game.save()
    }

    res.send()
}