import {Request, Response} from "express";
import {User} from "../models/User";

export default async (req: Request, res: Response) => {
    const uuid = req.query.uuid.toString()
    const user = await User.findOne({uuid})
    res.json(user)
}