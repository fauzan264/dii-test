import { prisma } from "../config/database";

export const createMenuService = async ({ name, url, parentId }: { name: string; url: string; parentId?: string | null }) => {
  if (parentId && !url) {
    throw { message: "URL is required when parent is provided", status: 400, isExpose: true};
  }

  const menu = await prisma.menus.create({
    data: {
      name,
      url,
      parentId: parentId ?? null
    },
    omit: {
      updatedAt: true,
      deletedAt: true
    }
  })

  const menuFormatter = {
    id: menu.id,
    name: menu.name,
    url: menu.url,
    parent_id: menu.parentId,
    created_at: menu.createdAt,
  };

  return menuFormatter;
};

export const updateMenuService = async ({ id, name, url, parentId }: { id: string; name: string; url: string; parentId?: string | null }) => {
  if (parentId && !url) {
    throw { message: "URL is required when parent is provided", status: 400, isExpose: true};
  }

  const checkMenu = await prisma.menus.findUnique({
    where: {
      id,
      deletedAt: null
    }
  })

  if (!checkMenu) {
  throw { message: "Menu not found", status: 404, isExpose: true };
  }

  const menu = await prisma.menus.update({
    where: {
      id
    },
    data: {
      name,
      url,
      parentId: parentId ?? null
    },
    omit: {
      deletedAt: true
    }
  })

  const menuFormatter = {
    id: menu.id,
    name: menu.name,
    url: menu.url,
    parent_id: menu.parentId,
    created_at: menu.createdAt,
		updated_at: menu.updatedAt
  };

  return menuFormatter;
};