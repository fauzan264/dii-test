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