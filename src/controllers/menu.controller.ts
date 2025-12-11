import { Request, Response } from "express";
import { createMenuService, updateMenuService } from "../services/menu.service";

export const createMenuController = async (req: Request, res: Response) => {
  const { name, url, parent_id } = req.body;

	const menu = await createMenuService({ name, url, parentId: parent_id ?? undefined });

  res.status(201).json({
    status: true,
    message: "Menu created successfully",
		data: menu
  })
};

export const updateMenuController = async (req: Request, res: Response) => {
  const { name, url, parent_id } = req.body;
	const { id } = req.params;

	const menu = await updateMenuService({ id: String(id), name, url, parentId: parent_id ?? undefined });

  res.status(200).json({
    status: true,
    message: "Menu updated successfully",
		data: menu
  })
};