import { Router } from "express";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import menuRouter from "./menu.router";

const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/roles", roleRouter);
mainRouter.use("/api/menus", menuRouter);

export default mainRouter