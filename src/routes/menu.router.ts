import { Router } from "express";
import { createMenuController, deleteMenuController, detailMenuController, getListMenuController, updateMenuController } from "../controllers/menu.controller";
import { validateYup } from "../middlewares/validateYup";
import { createMenuSchema, updateMenuSchema } from "../middlewares/validators/menu.validator";
import { jwtVerify } from "../middlewares/jwt.verify";

const menuRouter = Router();

menuRouter.post("/", jwtVerify, validateYup(createMenuSchema), createMenuController);
menuRouter.put("/:id", jwtVerify, validateYup(updateMenuSchema), updateMenuController);
menuRouter.delete("/:id", jwtVerify, deleteMenuController);
menuRouter.get("/:id", jwtVerify, detailMenuController);
menuRouter.get("/", jwtVerify, getListMenuController);

export default menuRouter;