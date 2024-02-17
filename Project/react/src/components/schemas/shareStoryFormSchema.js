import * as Yup from "yup";

const shareStoryFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Your name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed").min(2).max(50),
  email: Yup.string()
    .required("Your email is required")
    .email("Invalid email address"),
  story: Yup.string().required("A story is required").min(10).max(500),
});

export default shareStoryFormSchema;

