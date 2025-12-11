/*
  Warnings:

  - The primary key for the `role_menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role_menus` table. All the data in the column will be lost.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "role_menus" DROP CONSTRAINT "role_menus_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "role_menus_pkey" PRIMARY KEY ("role_id", "menu_id");

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id");
