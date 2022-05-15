import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .max(30, "username can't be larger than 12 chars")
    .min(2, "username should be bigger than 2 chars")
    .required(),
  email: yup.string().email("Please enter a correct email").required(),
  password: yup
    .string()
    .min(8, "Password should be minimum 8 characters length")
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Please enter a correct email").required(),
  password: yup.string().required(),
});

export const PostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

export const CommentSchema = yup.object().shape({
  comment: yup.string().required(),
});
