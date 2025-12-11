import { prisma } from "../config/database"

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