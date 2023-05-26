import { Router } from "express";
import loginUser from "../../controllers/user/userController.js";
import paths from "../../utils/paths.js";
import { loginValidation } from "../../../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(paths.login, loginValidation, loginUser);

export default userRouter;
