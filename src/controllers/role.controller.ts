import { Request, Response } from "express";
import { createRoleService, deleteRoleService, detailRoleService, updateRoleService } from "../services/role.service";

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