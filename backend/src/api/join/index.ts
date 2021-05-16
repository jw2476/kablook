import createGame from "./createGame";
import {Router} from "express";

const router = Router();

router.get("/createGame", createGame)

export default router