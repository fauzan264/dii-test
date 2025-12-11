import { Router } from "express";
import { jwtVerify } from "../middlewares/jwt.verify";
import { getDetailUserController, getListUserController, getUserRolesController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", jwtVerify, getListUserController);
userRouter.get("/:id", jwtVerify, getDetailUserController);
userRouter.get("/:id/roles", jwtVerify, getUserRolesController);
// userRouter.post("/:id/roles/:id", jwtVerify, assignRoleToUserController);
// userRouter.delete("/:id/roles/:id", jwtVerify, removeRoleFromUserController);

export default userRouter;