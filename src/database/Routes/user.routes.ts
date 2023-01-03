import { Router } from "express";
import { userController } from "../../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", userController.createUser);

userRouter.post("/login", userController.loginUser);

export { userRouter };
