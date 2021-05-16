import {Request, Response} from "express";
import {User} from "../../models/User";
import {createHash} from "crypto";

enum LoginStatus {
    ErrUsernameIncorrect = -2,
    ErrPasswordIncorrect,
    Success,
}

export default async (req: Request, res: Response) => {
    const username = req.query.username.toString()
    let password = req.query.password.toString()

    const hash = createHash('sha256')
    hash.update(password)
    password = hash.digest('hex')

    const user = await User.findOne({'username': username});
    if (!user) {
        res.json({
            status: LoginStatus.ErrUsernameIncorrect,
            uuid: null
        })
    } else if (user.password !== password) {
        res.json({
            status: LoginStatus.ErrPasswordIncorrect,
            uuid: null
        })
    } else {
        res.json({
            status: LoginStatus.Success,
            uuid: user.uuid
        })
    }
}
