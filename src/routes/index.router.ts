import { Router } from "express";
import authRouter from "./auth.router";
import roleRouter from "./role.router";

const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/roles", roleRouter);

export default mainRouter