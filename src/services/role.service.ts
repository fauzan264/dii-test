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