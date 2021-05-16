import {Router} from "express";
import auth from "./auth";
import game from "./game";
import join from "./join";

const router = Router();

router.use("/auth", auth)
router.use("/game", game)
router.use("/join", join)

export default router