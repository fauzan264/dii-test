import Router from "express";
import { validateYup } from "../middlewares/validateYup";
import { createRoleSchema, deleteRoleSchema, updateRoleSchema } from "../middlewares/ validators/role.validator";
import { createRoleController, updateRoleController } from "../controllers/role.controller";

const roleRouter = Router()

roleRouter.post("/", validateYup(createRoleSchema), createRoleController);
roleRouter.put("/:id", validateYup(updateRoleSchema), updateRoleController);
// roleRouter.delete("/:id", validateYup(deleteRoleSchema), deleteRoleController);

export default roleRouter;