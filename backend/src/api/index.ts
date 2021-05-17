import {Router} from "express";
import auth from "./auth";
import game from "./game";
import join from "./join";
import spells from "./spells";

const router = Router();

router.use("/auth", auth)
router.use("/game", game)
router.use("/join", join)
router.get("/spells", spells)

export default router