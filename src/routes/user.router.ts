import { Router } from "express";
import { jwtVerify } from "../middlewares/jwt.verify";
import { assignRoleToUserController, getDetailUserController, getListUserController, getUserRolesController, removeRoleFromUserController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", jwtVerify, getListUserController);
userRouter.get("/:id", jwtVerify, getDetailUserController);
userRouter.get("/:id/roles", jwtVerify, getUserRolesController);
userRouter.post("/:id/roles/:roleId", jwtVerify, assignRoleToUserController);
userRouter.delete("/:id/roles/:roleId", jwtVerify, removeRoleFromUserController);

export default userRouter;