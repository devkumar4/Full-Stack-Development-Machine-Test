import express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();

router.post("/login", AuthController.signin);
router.post("/signup", AuthController.signup);

export default router;
