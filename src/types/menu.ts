export interface CreateMenuRequest {
  name: string;
  url?: string | null;
  parentId?: string | null;
}

export interface UpdateMenuRequest {
  id: string;
  name: string;
  url?: string | null;
  parentId?: string | null;
}