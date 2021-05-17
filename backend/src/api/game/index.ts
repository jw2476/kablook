import { Router } from "express";
import question from "./question";
import attack from "./attack";
import boss from "./boss";

const router = Router()

router.post("/attack", attack)
router.get("/boss", boss)
router.get("/question", question)

export default router