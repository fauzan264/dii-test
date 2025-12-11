import * as yup from "yup";

export const createRoleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().optional(),
});

export const updateRoleSchema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
});

export const addRoleMenusSchema = yup.object().shape({
  menu_ids: yup.array().of(yup.string().uuid()).min(1, "At least one menu ID is required").required("Menu IDs are required"),
});

export const deleteRoleMenusSchema = yup.object().shape({
  menu_ids: yup.array().of(yup.string().uuid()).min(1, "At least one menu ID is required").required("Menu IDs are required"),
});
