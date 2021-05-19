import {Request, Response} from "express";
import {User} from "../../models/User";
import {Game} from "../../models/Game";
import sockets from "../../io/sockets";
import {Spell, SpellType} from "../spells";

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

    // Handle spells
    const {boss} = game
    const hostSocket = sockets.get(game.host.username)

    let damage = 0

    switch (spell.id) {
        case SpellType.Fireball: {
            boss.data.fire++
            damage = spell.baseDamage * actionCharge / 100
            break
        }
        case SpellType.Electrocute: {
            boss.data.electro++
            damage = spell.baseDamage * actionCharge / 100
            break
        }
        case SpellType.ForcefulStrike: {
            damage = spell.baseDamage * actionCharge / 100
            break
        }
        case SpellType.Smite: {
            damage = spell.baseDamage * actionCharge / 100
            break
        }
        case SpellType.TacticalStrike: {
            damage = spell.baseDamage * actionCharge / 100

            if (Math.floor(Math.random() * 10) == 0 && Math.random() < actionCharge / 100) { // 1 in 10 chance for stun and n in 4 chance where n is the number of correct answers
                boss.data.stunned = true
                hostSocket.emit("styled message", {
                    content: `${player.username} stunned the boss!`,
                    style: "has-text-primary has-text-weight-bold"
                })
            }

            break
        }
        case SpellType.Taunt: {
            player.hitPoints += actionCharge / 2
        }
    }

    if (damage !== 0) {
        boss.health -= damage
        hostSocket.emit("message", `${player.username} used ${spell.name} dealing ${damage} damage`)
        hostSocket.emit("set boss health", boss.health)
    }

    await boss.save()
    await player.save()

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

        if (boss.data.electro >= 10 && boss.data.fire >= 10) { // Explosion
            hostSocket.emit("styled message", {
                content: "The boss has exploded dealing 500 damage!",
                style: "has-text-primary has-text-weight-bold"
            })
            boss.data.electro -= 10
            boss.data.fire -= 10
            boss.health -= 500
            await boss.save()
        }

        const players = []

        for (const playerID of game.players) {
            const player = await User.findOne({_id: playerID})
            players.push(player)
        }

        players.map(player => sockets.get(player.username).emit("round over"))

        const totalHitPoints = players.map(player => player.hitPoints).reduce((a, b) => a + b)
        for (const player of players) {
            if (Math.floor(Math.random() * totalHitPoints) < player.hitPoints) {
                player.hitPoints -= boss.damage
                hostSocket.emit("message", `${player.username} has been hit for ${boss.damage} damage`)

                if (player.hitPoints < 0) {
                    sockets.get(player.username).emit("dead")

                    const index = game.players.indexOf(player._id);
                    if (index > -1) {
                        game.players.splice(index, 1);
                        await game.save()
                    }

                    hostSocket.emit("styled message", {
                        content: `${player.username} has died... There are ${game.players.length} remaining`,
                        style: "has-text-danger has-text-weight-bold"
                    })

                    if (game.players.length === 0) {
                        hostSocket.emit("styled message", {
                            content: "You have lost the game...",
                            style: "has-text-danger has-text-weight-bold"
                        })
                    }
                }

                await player.save()
            }
        }
    } else {
        res.json(false)
    }
}