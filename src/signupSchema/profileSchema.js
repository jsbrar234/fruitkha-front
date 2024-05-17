import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;

export const profileSchema = Yup.object({
    firstName: Yup.string().min(2 , " First Name must have 2 charecter ").max(100).required("Please Enter Your First Name"),
    lastName: Yup.string().min(0).max(100).required("Please Enter Your Last Name"),
    phone: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required'),
    // dateOfBirth: Yup.date().required('Date of Birth is required'),
    pincode: Yup.string().required('Pincode is required'),
    city: Yup.string().required('Pincode is required'),
    state: Yup.string().required('State is required'),
})




