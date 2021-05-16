import { Router } from "express";
import question from "./question";

const router = Router()

router.get("/question", question)

export default router