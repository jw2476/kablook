import {Router} from "express";
import signup from "./signup";
import login from "./login";

const router = Router();

router.get("/login", login)
router.get("/signup", signup);

export default router;