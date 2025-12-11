import { Request, Response } from "express";
import { addRoleMenusService, createRoleService, deleteRoleService, detailRoleService, getListRoleService, updateRoleService } from "../services/role.service";

export const createRoleController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const role = await createRoleService({name, description});

	res.status(201).json({
		success: true,
		message: "Role created successfully",
		data: role
	})
}

export const updateRoleController = async (req: Request, res: Response) => {
  const { name, description } = req.body;
	const { id } = req.params;

  const role = await updateRoleService({id: String(id), name, description});

	res.status(200).json({
		success: true,
		message: "Role updated successfully",
		data: role
	})
}

export const deleteRoleController = async (req: Request, res: Response) => {
	const { id } = req.params;
	
	await deleteRoleService({ id: String(id) });
	
	res.status(200).json({
		success: true,
		message: "Role deleted successfully"
	})
}

export const detailRoleController = async (req: Request, res: Response) => {
	const { id } = req.params;
	
	const role = await detailRoleService(String(id));
	
	res.status(200).json({
		success: true,
		message: "Role retrieved successfully",
		data: role
	})
}

export const getListRoleController = async (req: Request, res: Response) => {
	const roles = await getListRoleService();
	
	res.status(200).json({
		success: true,
		message: "Roles retrieved successfully",
		data: roles
	})
}

export const addRoleMenusController = async (req: Request, res: Response) => {
	const { menu_ids } = req.body;
	const { id } = req.params;

	const roleMenus = await addRoleMenusService({ roleId: String(id), menuIds: menu_ids });

  res.status(201).json({
    success: true,
    message: "Role menus added successfully",
    data: roleMenus
  });
}

export const deleteRoleMenusController = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Role menus deleted successfully"
  });
}
