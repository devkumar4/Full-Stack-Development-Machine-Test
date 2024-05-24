import express from "express";
import UserController from "../controllers/userContoller";
import { verifyTokenMiddleware } from "../middlewares/AuthenticationMiddleware";

const   router = express.Router();

router.get("/userdetail", verifyTokenMiddleware, UserController.getUser);

export default router