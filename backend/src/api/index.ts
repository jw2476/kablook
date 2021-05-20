import {Router} from "express";
import auth from "./auth";
import game from "./game";
import join from "./join";
import spells from "./spells";
import jobs from "./jobs";
import user from "./user";

const router = Router();

router.use("/auth", auth)
router.use("/game", game)
router.get("/jobs", jobs)
router.use("/join", join)
router.get("/spells", spells)
router.get("/user", user)

export default router