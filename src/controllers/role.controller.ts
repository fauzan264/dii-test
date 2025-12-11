import { Request, Response } from "express";
import { createRoleService } from "../services/role.service";

export const createRoleController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const role = await createRoleService({name, description});

	res.status(201).json({
		success: true,
		message: "Role created successfully",
		data: role
	})
}