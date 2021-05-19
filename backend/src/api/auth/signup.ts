import {Request, Response} from "express";
import {User} from "../../models/User";
import {createHash} from "crypto";
import { v4 as uuidv4 } from 'uuid';


enum SignUpStatus {
    ErrUsernameTaken = -1,
    Success
}

export default async (req: Request, res: Response) => {
    let {
        username,
        password,
        job
    } = req.body

    const hash = createHash('sha256')
    hash.update(password)
    password = hash.digest('hex')

    const existingUser = await User.findOne({'username': username});
    if (existingUser) {
        res.json({
            status: SignUpStatus.ErrUsernameTaken,
            uuid: existingUser.uuid
        });
        return
    }

    const uuid = uuidv4()

    await new User({
        username,
        password,
        uuid,
        job
    }).save()

    res.json({
        status: SignUpStatus.Success,
        uuid,
        job
    })
}