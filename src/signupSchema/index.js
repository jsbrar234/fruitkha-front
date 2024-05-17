import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;

export const signupschema = Yup.object({
    firstName: Yup.string().min(2 , " First Name must have 2 charecter ").max(100).required("Please Enter Your First Name"),
    lastName: Yup.string().min(0).max(100).required("Please Enter Your Last Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    phone: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required'),
    password: Yup.string().min(6, "Password must be atleast 6 Characters").required("Please Enter Your Password"),
    cpassword: Yup.string().required("Please Confirm Your Password").oneOf([Yup.ref('password'), null], "Password must match"),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().oneOf(['male', 'female'], 'Gender is required').required('Gender is required'),
    pincode: Yup.string().required('Pincode is required'),
    city: Yup.string().required('Pincode is required'),
    state: Yup.string().required('State is required'),
})




