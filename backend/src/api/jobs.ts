import {Request, Response} from "express";

type Job = {
    name: string,
    description: string
}

const jobs: Job[] = [
    {
        name: "Wizard",
        description: "Uses magic to deal damage"
    },
    {
        name: "Warrior",
        description: "Uses weapons to deal damage"
    },
    {
        name: "Paladin",
        description: "Takes the damage for the party"
    }
]

export default (req: Request, res: Response) => {
    res.json(jobs)
}