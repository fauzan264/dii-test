import { Request, Response } from "express"
import { assignRoleToUserService, getDetailUserService, getListUserService, getUserRolesService, removeRoleFromUserService } from "../services/user.service"

export const getListUserController = async (req: Request, res: Response) => {
  const users = await getListUserService()
  
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users
  })
}

export const getDetailUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const user = await getDetailUserService({ id: String(id) })

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user
  })
}

export const getUserRolesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRoles = await getUserRolesService({ id: String(id) });
  
  res.status(200).json({
    success: true,
    message: "User roles retrieved successfully",
    data: userRoles
  })
}

export const assignRoleToUserController = async (req: Request, res: Response) => {
  const { id, roleId } = req.params;
  
  const userRole = await assignRoleToUserService({id: String(id), roleId: String(roleId)});
  res.status(200).json({
    success: true,
    message: "Role assigned successfully",
    data: userRole
  })
}

export const removeRoleFromUserController = async (req: Request, res: Response) => {
  const { id, roleId } = req.params;

  await removeRoleFromUserService({ id: String(id), roleId: String(roleId) });
  
  res.status(200).json({
    success: true,
    message: "Role removed successfully"
  })
}
