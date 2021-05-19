import {Document, model, Schema} from "mongoose";

type BossData = {
    fire: number,
    electro: number,
    stunned: boolean
}

type IBoss = {
    health: number
    maxHealth: number
    damage: number
    data: BossData
}

export type BossDoc = IBoss & Document;

const bossModel = new Schema({
    health: Number,
    maxHealth: Number,
    damage: Number,
    data: Object
})

export const Boss = model<BossDoc>("Boss", bossModel);