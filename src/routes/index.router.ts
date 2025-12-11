import { Router } from "express";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import menuRouter from "./menu.router";
import userRouter from "./user.router";

const mainRouter = Router();

mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/roles", roleRouter);
mainRouter.use("/api/menus", menuRouter);
mainRouter.use("/api/users", userRouter);

export default mainRouter