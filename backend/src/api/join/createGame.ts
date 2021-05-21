import {Request, Response} from "express";
import { Boss } from "../../models/Boss";
import { Game } from "../../models/Game";
import {User} from "../../models/User";

export default async (req: Request, res: Response) => {
   const hostUUID = req.query.host.toString()

   const host = await User.findOne({'uuid': hostUUID})
   if (!host) {
      res.send(404);
      return
   }
   const game = await Game.findOne({'host': host._id}).populate("players").populate("boss")
   if (game) {
      res.json({
         code: game.code,
         players: game.players.map(player => player.username),
         bossHealth: game.boss.health,
         maxBossHealth: game.boss.maxHealth
      })
      return
   }

   const code = Math.floor(Math.random() * 1000000);

   const boss = await new Boss({
      health: 10000,
      maxHealth: 10000,
      damage: 100,
      data: {
         stunned: false,
         fire: 0,
         electro: 0
      }
   }).save()

   await new Game({
      host: host._id,
      players: [],
      code,
      finished: 0,
      boss: boss._id
   }).save()

   res.json({
      code,
      players: [],
      bossHealth: boss.health,
      maxBossHealth: boss.maxHealth
   })
}
