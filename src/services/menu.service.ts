import { prisma } from "../config/database";

export const createMenuService = async ({ name, url, parentId }: { name: string; url: string; parentId?: string | null }) => {
  if (parentId && !url) {
    throw { message: "URL is required when parent is provided", status: 400, isExpose: true};
  }

  const menu = await prisma.menus.create({
    data: {
      name,
      url: url || null,
      parentId: parentId || null
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
      url: url || null,
      parentId: parentId || null
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

export const deleteMenuService = async (id: string) => {
	const checkMenu = await prisma.menus.findUnique({
		where: {
			id,
			deletedAt: null
		}
	});

	if (!checkMenu) {
		throw { message: "Menu not found", status: 404, isExpose: true };
	}

  await prisma.menus.update({
    where: {
      id,
      deletedAt: null
    },
    data: {
      deletedAt: new Date()
    }
  });
};

export const detailMenuService = async (id: string) => {
	const menu = await prisma.menus.findUnique({
		where: {
			id,
			deletedAt: null
		},
		select: {
			id: true,
			name: true,
			url: true,
			parent: {
				select: {
					id: true,
					name: true
				}
			},
			children: {
				select: {
					id: true,
					name: true,
					url: true
				}
			},
			createdAt: true,
			updatedAt: true
		}
	})

	if (!menu) {
		throw { message: "Menu not found", status: 404, isExpose: true };
	}

	const menuFormatter = {
		id: menu.id,
		name: menu.name,
		url: menu.url,
		parent: menu.parent,
		children: menu.children,
		created_at: menu.createdAt,
		updated_at: menu.updatedAt
	};

	return menuFormatter;
}

export const getListMenuService = async () => {
  const menus = await prisma.menus.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      url: true,
      parentId: true,
      createdAt: true,
      updatedAt: true
    }
  });

  const menusFormatter = menus.map(menu => ({
    id: menu.id,
    name: menu.name,
    url: menu.url,
    parent_id: menu.parentId,
    created_at: menu.createdAt,
    updated_at: menu.updatedAt
  }));

  return menusFormatter;
};

