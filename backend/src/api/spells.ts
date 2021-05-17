import {Request, Response} from "express";

export type Spell = {
    name: string,
    description: string,
    baseDamage: number
}

const spells: Spell[] = [
    {
        name: "Fireball",
        description: "A big ball of fire, lots of damage, will also inflict burning(statuses coming soon)",
        baseDamage: 100
    }
]

export default (req: Request, res: Response) => {
    res.json(spells)
}