import * as Yup from "yup";


export const passwordSchema = Yup.object({
    oldPassword: Yup.string().required("Please Enter Your Old Password"),
    password: Yup.string().min(6, "Password must be atleast 6 Characters").required("Please Enter Your Password"),
    confirmPassword: Yup.string().required("Please Confirm Your Password").oneOf([Yup.ref('password'), null], "Password must match"),

})




