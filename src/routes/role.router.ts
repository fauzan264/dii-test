import Router from "express";
import { validateYup } from "../middlewares/validateYup";
import { addRoleMenusSchema, createRoleSchema, deleteRoleMenusSchema, updateRoleSchema } from "../middlewares/validators/role.validator";
import { addRoleMenusController, createRoleController, deleteRoleController, deleteRoleMenusController, detailRoleController, getListRoleController, getListRoleMenuController, updateRoleController } from "../controllers/role.controller";
import { jwtVerify } from "../middlewares/jwt.verify";

const roleRouter = Router()

roleRouter.post("/", jwtVerify, validateYup(createRoleSchema), createRoleController);
roleRouter.put("/:id", jwtVerify, validateYup(updateRoleSchema), updateRoleController);
roleRouter.delete("/:id", jwtVerify, deleteRoleController);
roleRouter.get("/:id", jwtVerify, detailRoleController);
roleRouter.get("/", jwtVerify, getListRoleController);
roleRouter.post("/:id/menus", jwtVerify, validateYup(addRoleMenusSchema), addRoleMenusController);
roleRouter.delete("/:id/menus", jwtVerify, validateYup(deleteRoleMenusSchema), deleteRoleMenusController);
roleRouter.get("/:id/menus", jwtVerify, getListRoleMenuController);

export default roleRouter;