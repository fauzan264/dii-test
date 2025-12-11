import { Router } from "express";
import { createMenuController, deleteMenuController, detailMenuController, getListMenuController, updateMenuController } from "../controllers/menu.controller";
import { validateYup } from "../middlewares/validateYup";
import { createMenuSchema, updateMenuSchema } from "../middlewares/validators/menu.validator";

const menuRouter = Router();

menuRouter.post("/", validateYup(createMenuSchema), createMenuController);
menuRouter.put("/:id", validateYup(updateMenuSchema), updateMenuController);
menuRouter.delete("/:id", deleteMenuController);
menuRouter.get("/:id", detailMenuController);
menuRouter.get("/", getListMenuController);

export default menuRouter;