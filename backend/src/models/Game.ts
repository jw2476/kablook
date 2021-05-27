import {Document, model, Schema} from "mongoose";
import {UserDoc} from "./User";
import {BossDoc} from "./Boss";

export type IGame = {
    host: UserDoc
    players: UserDoc[]
    code: number
    finished: number
    boss: BossDoc
    started: boolean
}

type GameDoc = IGame & Document;

const gameModel = new Schema({
    host: {type: Schema.Types.ObjectId, ref: "User"},
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    code: Number,
    finished: Number,
    boss: {type: Schema.Types.ObjectId, ref: "Boss"},
    started: Boolean
})

export const Game = model<GameDoc>("Game", gameModel);