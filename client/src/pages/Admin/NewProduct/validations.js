import * as Yup from "yup";
const newProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  department: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(800, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(1)
    .required("Required")
    .positive("Positive")
    .integer(),
});
export default newProductSchema;
