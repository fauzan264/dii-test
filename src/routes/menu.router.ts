import { Router } from "express";
import { createMenuController, deleteMenuController, detailMenuController, updateMenuController } from "../controllers/menu.controller";

const menuRouter = Router();

menuRouter.post("/", createMenuController);
menuRouter.put("/:id", updateMenuController);
menuRouter.delete("/:id", deleteMenuController);
menuRouter.get("/:id", detailMenuController);

export default menuRouter;