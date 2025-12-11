import { Router } from "express";
import { authRegisterController, authLoginController } from "../controllers/auth.controller";
import { validateYup } from "../middlewares/validateYup";
import { authRegisterSchema, authLoginSchema } from "../middlewares/ validators/auth.validator";

const authRouter = Router();

authRouter.post("/register", validateYup(authRegisterSchema), authRegisterController);
authRouter.post("/login", validateYup(authLoginSchema), authLoginController);

export default authRouter;