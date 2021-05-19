import {Request, Response} from "express";
import {User} from "../models/User";

export enum SpellType {
    Fireball,
    Electrocute,
    Taunt,
    Smite,
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
        description: "A big ball of fire, lots of damage",
        baseDamage: 50,
        job: "Wizard",
        id: SpellType.Fireball
    },
    {
        name: "Electrocute",
        description: "A big ball of electricity, electrocutes the target",
        baseDamage: 50,
        job: "Wizard",
        id: SpellType.Electrocute
    },
    {
        name: "Taunt",
        description: "Insult the enemy, no damage, but you will gain a lot of target points, increasing the likelihood of being hit",
        baseDamage: 0,
        job: "Paladin",
        id: SpellType.Taunt
    },
    {
        name: "Smite",
        description: "Smite the enemy with divine power, deals some damage",
        baseDamage: 25,
        job: "Paladin",
        id: SpellType.Smite
    },
    {
        name: "Tactical Strike",
        description: "Not as much damage as Forceful Strike, but has a 10% chance to stun the enemy, preventing it from attacking someone for a turn",
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