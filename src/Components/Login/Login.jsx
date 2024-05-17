import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../CommonComponents/BreadCrumb';
import { Footer } from '../CommonComponents/Footer';
import { Navbar } from '../CommonComponents/Navbar';
import { toast } from 'react-toastify'

export const Login = () => {
    const myObj = {
        title: "Login",
        desc: "BUY FRESH FRUITS"
    };
    

    const initialValues = {
        email: "",
        password: ""
    };

    const navigate = useNavigate();

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: async (values, actions) => {
            const body = {
                email: values.email,
                password: values.password
            };

            try {
                const response = await axios.post("https://fruitkha-production.up.railway.app/users/login", body);
                actions.resetForm();
                localStorage.setItem("fruitKhaToken", response.data.accessToken);
                toast.success('Logged In Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                navigate('/shop');
            } catch (error) {
                console.log("Error during login:", error);
                toast.error('Invalid Credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }
    });

    return (
        <>
            <Navbar />
            <BreadCrumb data={myObj} />

            <div className="contact-from-section mt-150 mb-150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="form-title">
                                <h2>Login Form</h2>
                            </div>
                            <div id="form_status"></div>
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <p>
                                        <input
                                            type='email'
                                            name='email'
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter Email'
                                            className='login_Form'
                                            required
                                        />
                                    </p>
                                    <p>
                                        <input
                                            type='password'
                                            name='password'
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter Password'
                                            className='login_Form'
                                            required
                                        />
                                    </p>
                                    <Link to='/forgotPassword'><p>Forgot Password?</p></Link>
                                    <p>
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
