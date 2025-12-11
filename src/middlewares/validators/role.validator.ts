import * as yup from "yup";

export const createRoleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().optional(),
});

export const updateRoleSchema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
});