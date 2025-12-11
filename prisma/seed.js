const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const roles = [
  {
    id: "019b0f40-ec9a-763f-9b33-3398d1fa3867",
    name: 'Admin',
    description: 'Administrator role with full access',
  },
];

const menus = [
  {
    id: "019b0f41-1c87-776e-bcb1-a0f7eedc8a4a",
    name: 'Dashboard',
    url: '/dashboard',
    parentId: null,
  },
];

const users = [
  {
    id: "019b0f41-b3a7-705c-a9dd-d95f300825cb",
    fullName: 'Admin User',
    username: 'admin',
    passwordHash: bcrypt.hashSync('testing123', 10),
  },
];

const userRoles = [
  {
    userId: "019b0f41-b3a7-705c-a9dd-d95f300825cb",
    roleId: "019b0f40-ec9a-763f-9b33-3398d1fa3867",
  },
];

const roleMenus = [
  {
    roleId: "019b0f40-ec9a-763f-9b33-3398d1fa3867",
    menuId: "019b0f41-1c87-776e-bcb1-a0f7eedc8a4a",
  },
];

async function main() {
  await prisma.roles.createMany({
    data: roles,
  });

  await prisma.menus.createMany({
    data: menus,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.userRoles.createMany({
    data: userRoles,
  });

  await prisma.roleMenus.createMany({
    data: roleMenus,
  });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });