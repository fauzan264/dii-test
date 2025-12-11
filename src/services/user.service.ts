import { prisma } from "../config/database"
import { AssignRoleToUserRequest, RemoveRoleFromUserRequest } from "../types/user";

export const getListUserService = async () => {
  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    omit: {
      passwordHash: true,
      deletedAt: true
    }
  })

  const usersFormatter = users.map((user) => {
    return {
      id: user.id,
      full_name: user.fullName,
      username: user.username,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  })

  return usersFormatter;
}

export const getDetailUserService = async ({id}: {id: string}) => {
  const user = await prisma.user.findUnique({
    where: { id, deletedAt: null },
    omit: {
      passwordHash: true,
      deletedAt: true
    }
  })

  if (!user) {
    throw { message: "User not found", status: 404, isExpose: true };
  }

  const userFormatter = {
    id: user.id,
    full_name: user.fullName,
    username: user.username,
    created_at: user.createdAt,
    updated_at: user.updatedAt
  }

  return userFormatter;
}

export const getUserRolesService = async ({id}: {id: string}) => {
  const userRoles = await prisma.userRoles.findMany({
    where: { userId: id },
    include: {
      role: {
        omit: {
          deletedAt: true
        }
      }
    }
  });

  return userRoles.map((userRole) => ({
    id: userRole.roleId,
    name: userRole.role.name,
    created_at: userRole.role.createdAt,
    updated_at: userRole.role.updatedAt
  }));
}

export const assignRoleToUserService = async ({id, roleId}: AssignRoleToUserRequest) => {
  const checkUser = await prisma.user.findUnique({
    where: { id: id, deletedAt: null }
  });
  
  if (!checkUser) {
    throw { message: "User not found", status: 404, isExpose: true };
  }
  
  const checkRole = await prisma.roles.findUnique({
    where: {
      id: roleId,
      deletedAt: null
    }
  })

  if (!checkRole) {
    throw { message: "Role not found", status: 404, isExpose: true };
  }

  try {
    const userRole = await prisma.userRoles.create({
      data: {
        userId: id,
        roleId
      },
      select: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true
          }
        },
        role: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    const userRoleFormatter = {
      id: userRole.user.id,
      full_name: userRole.user.fullName,
      username: userRole.user.username,
      role: {
        id: userRole.role.id,
        name: userRole.role.name
      }
    }
  
    return userRoleFormatter;
  } catch (error) {
    throw error;
  }
}

export const removeRoleFromUserService = async ({id, roleId}: RemoveRoleFromUserRequest) => {
  const checkUser = await prisma.user.findUnique({
    where: { id: id, deletedAt: null }
  });
  
  if (!checkUser) {
    throw { message: "User not found", status: 404, isExpose: true };
  }
  
  const checkRole = await prisma.roles.findUnique({
    where: {
      id: roleId,
      deletedAt: null
    }
  })

  if (!checkRole) {
    throw { message: "Role not found", status: 404, isExpose: true };
  }

  try {
    await prisma.userRoles.delete({
      where: {
        userId_roleId: {
          userId: id,
          roleId: roleId
        }
      }
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw { message: "Role assignment not found", status: 404, isExpose: true };
    }
    throw { message: "Internal server error", isExpose: true };
  }
}