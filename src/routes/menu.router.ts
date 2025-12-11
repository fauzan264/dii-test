import { Router } from "express";
import { createMenuController, updateMenuController } from "../controllers/menu.controller";

const menuRouter = Router();

menuRouter.post("/", createMenuController);
menuRouter.put("/:id", updateMenuController);

export default menuRouter;