import { prisma } from "../config/database"

export const createRoleService = async ({name, description}: {name: string, description: string}) => {
  const role = await prisma.roles.create({
      data: {
          name,
          description
      },
      select: {
          id: true,
          name: true,
          description: true,
          createdAt: true
      }
  })

  const roleFormatter = {
      id: role.id,
      name: role.name,
      description: role.description,
      created_at: role.createdAt
  }

  return roleFormatter;
}

export const updateRoleService = async ({id, name, description}: {id: string, name: string, description: string}) => {
  const checkRole = await prisma.roles.findUnique({
    where: { id, deletedAt: null }
  });
    
  if (!checkRole) {
    throw { message: "Role not found", isExpose: true };
  }
    
  const role = await prisma.roles.update({
    where: {
      id
    },
    data: {
      name,
      description,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true
    }
  })

  const roleFormatter = {
    id: role.id,
    name: role.name,
    description: role.description,
    created_at: role.createdAt,
    updated_at: role.updatedAt
  }

  return roleFormatter;
}

export const deleteRoleService = async ({ id }: { id: string }) => {
  const role = await prisma.roles.findUnique({
    where: { id, deletedAt: null }
  });

  if (!role) {
    throw { message: "Role not found", isExpose: true };
  }

  await prisma.roles.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
}

export const detailRoleService = async (id: string) => {
  const role = await prisma.roles.findUnique({
    where: { id, deletedAt: null },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!role) {
    throw { message: "Role not found", status: 404, isExpose: true };
  }

  const roleFormatter = {
    id: role.id,
    name: role.name,
    description: role.description,
    created_at: role.createdAt,
    updated_at: role.updatedAt
  };

  return roleFormatter;
}

export const getListRoleService = async () => {
  const roles = await prisma.roles.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  const rolesFormatter = roles.map((role) => {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      created_at: role.createdAt,
      updated_at: role.updatedAt
    };
  });

  return rolesFormatter;
}

export const addRoleMenusService = async ({ roleId, menuIds }: { roleId: string; menuIds: string[] }) => {
	const checkRole = await prisma.roles.findUnique({
    where: { id: roleId, deletedAt: null }
  });

  if (!checkRole) {
    throw { message: "Role not found", isExpose: true };
  }

  const checkMenus = await prisma.menus.findMany({
    where: { id: { in: menuIds }, deletedAt: null }
  });

  if (checkMenus.length !== menuIds.length) {
    throw { message: "Some menu IDs not found", isExpose: true };
  }

  const existingRoleMenus = await prisma.roleMenus.findMany({
    where: { roleId, menuId: { in: menuIds } }
  });

  const existingMenuIds = existingRoleMenus.map(rm => rm.menuId);

	if (existingMenuIds.length) {
		throw { message: `Already assigned menu IDs: ${existingMenuIds.join(', ')}`, isExpose: true };
	}

  await prisma.roleMenus.createMany({
		data: menuIds.map((menuId) => ({
			roleId,
			menuId
		})),
	})

	const roleMenus = await prisma.roleMenus.findMany({
		where: { roleId, menuId: { in: menuIds } }
	});

	const roleMenusFormatter = roleMenus.map((rm) => ({
		role_id: rm.roleId,
		menu_id: rm.menuId
	}));
  
  return roleMenusFormatter;
}

export const deleteRoleMenusService = async ({ roleId, menuIds }: { roleId: string; menuIds: string[] }) => {
	const checkRole = await prisma.roles.findUnique({
    where: { id: roleId, deletedAt: null }
  });

  if (!checkRole) {
    throw { message: "Role not found", isExpose: true };
  }

  const checkMenus = await prisma.menus.findMany({
    where: { id: { in: menuIds }, deletedAt: null }
  });

  if (checkMenus.length !== menuIds.length) {
    throw { message: "Some menu IDs not found", isExpose: true };
  }

  const existingRoleMenus = await prisma.roleMenus.findMany({
    where: { roleId, menuId: { in: menuIds } }
  });

  const existingMenuIds = existingRoleMenus.map(rm => rm.menuId);

	if (menuIds.length !== existingMenuIds.length) {
		const missingIds = menuIds.filter(id => !existingMenuIds.includes(id));
		throw { message: `Some menu IDs are not assigned to this role. Missing IDs: ${missingIds.join(', ')}`, isExpose: true };
	}
	
	await prisma.roleMenus.deleteMany({
    where: {
      roleId,
      menuId: { in: menuIds }
    }
  });
  
  return existingMenuIds;
}
