import * as yup from 'yup'

export const createMenuSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string().optional().nullable(),
  parent_id: yup.string().optional().nullable(),
});

export const updateMenuSchema = yup.object().shape({
  name: yup.string().optional(),
  url: yup.string().optional().nullable(),
  parent_id: yup.string().optional().nullable(),
});