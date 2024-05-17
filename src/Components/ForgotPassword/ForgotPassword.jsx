import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'

export const ForgotPassword = () => {

    const myObj = {
        title: "Forgot Password",
        desc: "BUY FRESH FRUITS"
    }


    const navigate = useNavigate();

    const initialValues = {
        email: "",
        otp: "",
        password: "",
        confirmpassword: ""
    }

    const [otpSent, setOtpSent] = useState(false)

    const [changePass, setchangePass] = useState(false)


    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,

        onSubmit: async (values, action) => {
            if (otpSent) {

                if(!values.otp){
                    return toast.error('Please Enter OTP', {
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

                const body = {
                    email: values.email,
                    otp: values.otp,
                }

                console.log('values.email', values.email)

                axios.post("https://fruitkha-production.up.railway.app/users/verifyOtp", body).then((response) => {
                    // localStorage.setItem("fruitKhaToken", response.data.accessToken);
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
                    if(response.data.success){
                        setchangePass(true)
                        setOtpSent(false)
                        values.otp = ""
                    }
                }).catch((error) => {
                    console.log("error", error)
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
                });
            }

            else if(changePass){

                if(values.password == ""){
                    return toast.error("Please Enter Your New Password", {
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
                if(values.password!==values.confirmpassword){
                    return toast.error("Please not Matched with Confirm Password", {
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
            

                const body = {
                    email: values.email,
                    password: values.password,
                }

                axios.put("https://fruitkha-production.up.railway.app/users/changePassword", body).then((response) => {
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
                    navigate('/login')
                    setchangePass(false)
                }).catch((error) => {
                    console.log("error", error)
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
                });


            }

            else {
                const body = {
                    email: values.email,
                }

                if(!values.email){
                    return toast.error('Please Enter Your Email', {
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



                else{
                    axios.put("https://fruitkha-production.up.railway.app/users/sendOtp", body).then((response) => {
                    // localStorage.setItem("fruitKhaToken", response.data.accessToken);
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
                    setOtpSent(true)
                }).catch((error) => {
                    console.log("error", error)
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
                });
                }
            }
        }
    })
    return (
        <>
            <Navbar />
            <BreadCrumb data={myObj} />

            {
                changePass ? <div class="contact-from-section mt-150 mb-150">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <div class="form-title">
                                <h2>New Password</h2>
                            </div>
                            <div id="form_status"></div>
                            <div class="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <p><input type='password' name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Password' className='login_Form' /></p>
                                    <p><input type='password' name='confirmpassword' value={values.confirmpassword} onBlur={handleBlur} onChange={handleChange} placeholder='Confirm Password' className='login_Form' /></p>
                                    <p style={{ textAlign: "center" }}><input type="submit" value="Submit" /></p>
                                    {/* {errors.password && touched.password ? (<span>{errors.password}</span>) : null} */}
                            
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div> :  otpSent ?

                    <div class="contact-from-section mt-150 mb-150">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 mb-5 mb-lg-0">
                                    <div class="form-title">
                                        <h2>Enter OTP</h2>
                                    </div>
                                    <div id="form_status"></div>
                                    <div class="contact-form">
                                        <form onSubmit={handleSubmit}>
                                            <p><input type='text' name='otp' value={values.otp} onBlur={handleBlur} onChange={handleChange} placeholder='Enter OTP' className='login_Form' /></p>
                                            <p style={{ textAlign: "center" }}><input type="submit" value="Submit" /></p>
                                            {/* {errors.otp && touched.otp ? (<span>{errors.otp}</span>) : null} */}

                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    :

                    <div class="contact-from-section mt-150 mb-150">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 mb-5 mb-lg-0">
                                    <div class="form-title">
                                        <h2>Enter Your Email</h2>
                                    </div>
                                    <div id="form_status"></div>
                                    <div class="contact-form">
                                        <form onSubmit={handleSubmit}>
                                            <p><input type='text' name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder='Enter Email' className='login_Form' /></p>
                                            <p style={{ textAlign: "center" }}><input type="submit" value="Submit" /></p>
                                            {/* {errors.email && touched.email ? (<span>{errors.email}</span>) : null} */}
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            }
<Footer/>
        </>
    )
}
