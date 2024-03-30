import { Router } from "express";

const router = Router();

router.route("/login").get("loginController");
router.route("/login").post("loggingContoller");