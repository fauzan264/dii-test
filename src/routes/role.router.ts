import Router from "express";
import { validateYup } from "../middlewares/validateYup";
import { createRoleSchema, updateRoleSchema } from "../middlewares/validators/role.validator";
import { createRoleController, deleteRoleController, detailRoleController, updateRoleController } from "../controllers/role.controller";

const roleRouter = Router()

roleRouter.post("/", validateYup(createRoleSchema), createRoleController);
roleRouter.put("/:id", validateYup(updateRoleSchema), updateRoleController);
roleRouter.delete("/:id", deleteRoleController);
roleRouter.get("/:id", detailRoleController);

export default roleRouter;