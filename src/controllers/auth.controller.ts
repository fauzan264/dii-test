import { Request, Response } from "express";
import { authLoginService, authRegisterService, authSessionService } from "../services/auth.service"

export const authRegisterController = async (req: Request, res: Response) => {
	const { full_name, username, password, role } = req.body;

	const user = await authRegisterService({fullName: full_name, username, password, role});

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		data: user
	})
}

export const authLoginController = async (req: Request, res: Response) => {
	const { username, password, role } = req.body;
	
	const user = await authLoginService({username, password, role});

	res.status(200).json({
		success: true,
		message: "User logged in successfully",
		data: user
	});
}

export const authSessionController = async (req: Request, res: Response) => {
	const { user_id, role } = res.locals.payload;

	console.log(user_id);
	
	const user = await authSessionService({ id: user_id, role: role.id });
	
	res.status(200).json({
		success: true,
		message: "Session retrieved successfully",
		data: user
	});
}