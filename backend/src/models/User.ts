import {Document, model, Schema, Types} from "mongoose";
import {IGame} from "./Game";
import ObjectId  = Types

export type IUser = {
    username: String
    password: String
    uuid: String
    actionCharge: Number
    currentGame: IGame
}

type UserDoc = IUser & Document;

const userModel = new Schema({
    username: String,
    password: String,
    uuid: String,
    actionCharge: Number,
    currentGame: {type: ObjectId, ref: "Game"}
})

export const User = model<UserDoc>("User", userModel);