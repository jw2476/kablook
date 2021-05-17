import {Document, model, Schema, Types} from "mongoose";
import {IGame} from "./Game";
import ObjectId  = Types

type IUser = {
    username: String
    password: String
    uuid: String
    actionCharge: Number
}

export type UserDoc = IUser & Document;

const userModel = new Schema({
    username: String,
    password: String,
    uuid: String,
    actionCharge: Number
})

export const User = model<UserDoc>("User", userModel);