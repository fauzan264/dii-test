import { Router } from "express";
import { authRegisterController, authLoginController, authSessionController } from "../controllers/auth.controller";
import { validateYup } from "../middlewares/validateYup";
import { authRegisterSchema, authLoginSchema } from "../middlewares/validators/auth.validator";
import { jwtVerify } from "../middlewares/jwt.verify";

const authRouter = Router();

authRouter.post("/register", validateYup(authRegisterSchema), authRegisterController);
authRouter.post("/login", validateYup(authLoginSchema), authLoginController);
authRouter.get("/session", jwtVerify, authSessionController);

export default authRouter;