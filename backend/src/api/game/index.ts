import { Router } from "express";
import question from "./question";
import attack from "./attack";

const router = Router()

router.post("/attack", attack)
router.get("/question", question)

export default router