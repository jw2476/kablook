import {Request, Response} from "express";
import {Game} from "../../models/Game";
import {User} from "../../models/User";

export default async (req: Request, res: Response) => {
    const uuid = req.query.uuid.toString()
    const host = await User.findOne({uuid})
    const game = await Game.findOne({host:host._id}).populate("boss")
    res.json({
        health: game.boss.health,
        max: game.boss.maxHealth
    })
}