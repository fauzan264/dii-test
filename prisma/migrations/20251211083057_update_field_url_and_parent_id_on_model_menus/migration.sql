-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "parent_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "menus_parent_id_idx" ON "menus"("parent_id");

-- CreateIndex
CREATE INDEX "menus_name_idx" ON "menus"("name");

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");
