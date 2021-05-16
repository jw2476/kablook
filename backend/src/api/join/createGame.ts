import {Request, Response} from "express";
import { Game } from "../../models/Game";
import {User} from "../../models/User";

export default async (req: Request, res: Response) => {
   const hostUUID = req.query.host.toString()

   const host = await User.findOne({'uuid': hostUUID})
   if (!host) {
      res.send(404);
      return
   }
   const game = await Game.findOne({'host': host._id}).populate("players")
   if (game) {
      res.json({
         code: game.code,
         players: game.players.map(player => player.username)
      })
      return
   }

   const code = Math.floor(Math.random() * 1000000);

   await new Game({
      host: host._id,
      players: [],
      code,
      finished: 0
   }).save()

   res.json({
      code,
      players: []
   })
}
