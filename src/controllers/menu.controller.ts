import { Request, Response } from "express";
import { createMenuService, deleteMenuService, detailMenuService, updateMenuService } from "../services/menu.service";

export const createMenuController = async (req: Request, res: Response) => {
  const { name, url, parent_id } = req.body;

	const menu = await createMenuService({ name, url, parentId: parent_id ?? undefined });

  res.status(201).json({
    success: true,
    message: "Menu created successfully",
		data: menu
  })
};

export const updateMenuController = async (req: Request, res: Response) => {
  const { name, url, parent_id } = req.body;
	const { id } = req.params;

	const menu = await updateMenuService({ id: String(id), name, url, parentId: parent_id ?? undefined });

  res.status(200).json({
    success: true,
    message: "Menu updated successfully",
		data: menu
  })
};

export const deleteMenuController = async (req: Request, res: Response) => {
	const { id } = req.params;
	
	await deleteMenuService(String(id));
	
	res.status(200).json({
		success: true,
		message: "Menu deleted successfully"
	})
}

export const detailMenuController = async (req: Request, res: Response) => {
	const { id } = req.params;

	const menu = await detailMenuService(String(id));

	res.status(200).json({
		success: true,
		message: "Menu retrieved successfully",
		data: menu
	})
}