import {Document, model, Schema} from "mongoose";
import {IUser} from "./User";

export type IGame = {
    host: IUser
    players: IUser[]
    code: number
    finished: number
}

type GameDoc = IGame & Document;

const gameModel = new Schema({
    host: {type: Schema.Types.ObjectId, ref: "User"},
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    code: Number,
    finished: Number
})

export const Game = model<GameDoc>("Game", gameModel);