import {Request, Response} from "express";
import {User} from "../../models/User";
import {Game} from "../../models/Game";
import sockets from "../../io/sockets";
import {Spell} from "../spells";

type PlayerAttack = {
    actionCharge: number,
    uuid: string,
    spell: Spell
}

export default async (req: Request, res: Response) => {
    const attack = req.body as PlayerAttack
    const {
        uuid,
        actionCharge,
        spell
    } = attack

    const player = await User.findOne({uuid: uuid})
    player.actionCharge = actionCharge
    await player.save()

    const game = await Game.findOne({players: player._id}).populate("host").populate("boss")
    game.finished++
    await game.save()

    const damage = Math.floor((spell.baseDamage + Math.random() * 4) * actionCharge / 100)

    const hostSocket = sockets.get(game.host.username)
    hostSocket.emit("attack", {
        username: player.username,
        actionCharge: player.actionCharge,
        damage
    })

    const {boss} = game
    boss.health -= damage
    await boss.save()

    if (boss.health <= 0) {
        for (const playerID of game.players) {
            const player = await User.findOne({_id: playerID})
            const playerSocket = sockets.get(player.username)
            playerSocket.emit("game over")
        }

        hostSocket.emit("game over")

        await boss.deleteOne()
        await game.deleteOne()
    }

    if (game.finished === game.players.length) { // Round over
        res.json(true)
        game.finished = 0
        await game.save()

        for (const playerID of game.players) {
            const player = await User.findOne({_id: playerID})
            const playerSocket = sockets.get(player.username)
            playerSocket.emit("round over")
        }
    } else {
        res.json(false)
    }
}