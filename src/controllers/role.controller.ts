import { Request, Response } from "express";
import { createRoleService, updateRoleService } from "../services/role.service";

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