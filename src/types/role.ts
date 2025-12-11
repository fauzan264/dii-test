export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface UpdateRoleRequest {
  id: string;
  name: string;
  description: string;
}

export interface RoleMenuRequest {
  roleId: string;
  menuIds: string[];
}