import Router from "express";
import { validateYup } from "../middlewares/validateYup";
import { addRoleMenusSchema, createRoleSchema, deleteRoleMenusSchema, updateRoleSchema } from "../middlewares/validators/role.validator";
import { addRoleMenusController, createRoleController, deleteRoleController, deleteRoleMenusController, detailRoleController, getListRoleController, updateRoleController } from "../controllers/role.controller";

const roleRouter = Router()

roleRouter.post("/", validateYup(createRoleSchema), createRoleController);
roleRouter.put("/:id", validateYup(updateRoleSchema), updateRoleController);
roleRouter.delete("/:id", deleteRoleController);
roleRouter.get("/:id", detailRoleController);
roleRouter.get("/", getListRoleController);
roleRouter.post("/:id/menus", validateYup(addRoleMenusSchema), addRoleMenusController);
roleRouter.delete("/:id/menus", validateYup(deleteRoleMenusSchema), deleteRoleMenusController);

export default roleRouter;