import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { passwordSchema } from '../../changePasswordSchema';
import { BreadCrumb } from '../CommonComponents/BreadCrumb';
import { Footer } from '../CommonComponents/Footer';
import { Navbar } from '../CommonComponents/Navbar';

export const ChangePassword = () => {
    const myObj = {
        title: "Change Password",
        desc: "FRESH AND ORGANIC FRUITS"
    };

    let accessToken = localStorage.getItem('fruitKhaToken')

    const initialValues = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
    };

 

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema : passwordSchema,
        onSubmit: async (values, actions) => {
            const body = {
                oldPassword: values.oldPassword,
                password: values.password,
                confirmPassword: values.confirmPassword
            };

            axios.put("https://fruitkha-production.up.railway.app/users/changePasswordLogin", body, {
                headers: {
                    'Authorization': accessToken,
                },
            }).then((response) => {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    actions.resetForm();
            }).catch((error) => {
                console.log("Error getting user details :", error);
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            })
        }
    });

    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            <div className="contact-from-section mt-150 mb-150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="form-title">
                                <h2>ChangePassword</h2>
                            </div>
                            <div id="form_status"></div>
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <p>
                                        <input
                                            type='password'
                                            name='oldPassword'
                                            value={values.oldPassword}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter Old Password'
                                            className='login_Form'
                                        />
                                        {errors.oldPassword && touched.oldPassword ? (<span>{errors.oldPassword}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='password'
                                            name='password'
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter New Password'
                                            className='login_Form'
                                        />
                                        {errors.password && touched.password ? (<span>{errors.password}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='password'
                                            name='confirmPassword'
                                            value={values.confirmPassword}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter Confirm Password'
                                            className='login_Form'
                                        />
                                        {errors.confirmPassword && touched.confirmPassword ? (<span>{errors.confirmPassword}</span>) : null}
                                    </p>

                                    <p style={{ textAlign: "center" }}>
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="login-submit"
                                        />
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
