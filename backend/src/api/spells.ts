import {Request, Response} from "express";
import {User} from "../models/User";

export enum SpellType {
    Fireball,
    Electrocute,
    Taunt,
    Heal,
    TacticalStrike,
    ForcefulStrike
}

export type Spell = {
    name: string,
    description: string,
    baseDamage: number,
    job: string,
    id: SpellType
}

const spells: Spell[] = [
    {
        name: "Fireball",
        description: "A big ball of fire, medium damage but will set the target on fire causing damage over time",
        baseDamage: 25,
        job: "Wizard",
        id: SpellType.Fireball
    },
    {
        name: "Electrocute",
        description: "A big ball of electricity, electrocutes the target, with a 5% chance to stun the boss, preventing it from attacking this turn",
        baseDamage: 10,
        job: "Wizard",
        id: SpellType.Electrocute
    },
    {
        name: "Taunt",
        description: "Insult the enemy, greatly increasing the likelihood of being hit",
        baseDamage: 0,
        job: "Paladin",
        id: SpellType.Taunt
    },
    {
        name: "Heal",
        description: "Heal yourself",
        baseDamage: 50,
        job: "Paladin",
        id: SpellType.Heal
    },
    {
        name: "Tactical Strike",
        description: "Not as much damage as Forceful Strike, but has a 5% chance to stun the enemy, preventing it from attacking anyone for a turn",
        baseDamage: 20,
        job: "Warrior",
        id: SpellType.TacticalStrike
    },
    {
        name: "Forceful Strike",
        description: "Hit it really really hard with a sword, lots of damage",
        baseDamage: 50,
        job: "Warrior",
        id: SpellType.ForcefulStrike
    }
]

export default async (req: Request, res: Response) => {
    const uuid = req.query.uuid.toString()
    const user = await User.findOne({uuid})

    res.json(spells.filter(spell => spell.job === user.job))
}