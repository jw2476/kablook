import {Document, model, Schema} from "mongoose";

type IBoss = {
    health: number
    maxHealth: number
}

export type BossDoc = IBoss & Document;

const bossModel = new Schema({
    health: Number,
    maxHealth: Number
})

export const Boss = model<BossDoc>("Boss", bossModel);