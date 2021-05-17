import {Router} from "express";
import signup from "./signup";
import login from "./login";

const router = Router();

router.post("/login", login)
router.post("/signup", signup);

export default router;