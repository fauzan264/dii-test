import * as yup from "yup";

export const authRegisterSchema = yup.object().shape({
  full_name: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
	role: yup.string().required("Role is required"),
})

export const authLoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
	role: yup.string().required("Role is required"),
});
