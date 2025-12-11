import Router from "express";
import { validateYup } from "../middlewares/validateYup";
import { createRoleSchema, deleteRoleSchema, updateRoleSchema } from "../middlewares/ validators/role.validator";
import { createRoleController } from "../controllers/role.controller";

const roleRouter = Router()

roleRouter.post("/", validateYup(createRoleSchema), createRoleController);
// roleRouter.put("/", validateYup(updateRoleSchema), updateRoleController);
// roleRouter.delete("/", validateYup(deleteRoleSchema), deleteRoleController);

export default roleRouter;