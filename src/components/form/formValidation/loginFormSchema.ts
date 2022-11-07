import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
    password: Yup.string()
        .min(4, "Must be longer than 8 characters")
        .required("Required")
})
