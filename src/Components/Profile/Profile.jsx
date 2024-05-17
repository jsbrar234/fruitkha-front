import React, { useEffect, useState } from 'react'
import { Navbar } from '../CommonComponents/Navbar'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { profileSchema } from '../../signupSchema/profileSchema'
import { toast } from 'react-toastify'

export const Profile = () => {

    const myObj = {
        title: "Profile",
        desc: "FRESH AND ORGANIC FRUITS"
    }
    const accessToken = localStorage.getItem('fruitKhaToken');

    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [accessToken])

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const getData = async () => {

        axios.get("https://fruitkha-production.up.railway.app/users/getUserDetails", {
            headers: {
                'Authorization': accessToken,
            },
        }).then((response) => {
            setData(response.data.data);
            console.log('response.data.data', response.data.data)
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

    const initialValues = { firstName: data.firstName, lastName: data.lastName, phone: data.phone, pincode: data.pincode, city: data.city, state: data.state }


    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({

        enableReinitialize: true,
        initialValues,
        validationSchema: profileSchema,

        onSubmit:
            async (values, action) => {
                const body = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    pincode : values.pincode,
                    city : values.city,
                    state : values.state,
                };


                axios.put("https://fruitkha-production.up.railway.app/users/updateUser", body, {
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
                }).catch((error) => {
               
                    console.log('error in update', error)
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




    });

    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            <>
                <div class="contact-from-section mt-150 mb-150">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 mb-5 mb-lg-0">
                                <div class="form-title">
                                    <h2>Your Profile</h2>
                                    {/* <p>You can update your profile here</p> */}
                                </div>
                                <div id="form_status"></div>
                                <div class="contact-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className='row justify-content-center'>
                                            <div className='col-lg-4'>

                                                <div className='profile-input'>
                                                    <label>First Name</label>
                                                    <input type="text" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} name="firstName" value={values.firstName} id="name" />
                                                    {errors.firstName && touched.firstName ? (<span>{errors.firstName}</span>) : null}
                                                </div>
                                                <div className='profile-input'>
                                                    <label>Last Name</label>
                                                    <input type="text" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} name="lastName" value={values.lastName} id="name" />
                                                    {errors.lastName && touched.lastName ? (<span>{errors.lastName}</span>) : null}
                                                </div>
                                                <div className='profile-input'>
                                                    <label>Phone Number</label>
                                                    <input type="text" placeholder="Phone No." onChange={handleChange} onBlur={handleBlur} name="phone" value={values.phone} id="name" />
                                                    {errors.phone && touched.phone ? (<span>{errors.phone}</span>) : null}
                                                </div>
                                                

                                                <div className='profile-input'>
                                                    <label>Pincode</label>
                                                    <input type="string" placeholder="Pincode" onChange={handleChange} onBlur={handleBlur} name="pincode" value={values.pincode} id="name" />
                                                    {errors.pincode && touched.pincode ? (<span>{errors.pincode}</span>) : null}
                                                </div>

                                                <div className='profile-input'>
                                                    <label>City</label>
                                                    <input type="string" placeholder="City" onChange={handleChange} onBlur={handleBlur} name="city" value={values.city} id="name" />
                                                    {errors.city && touched.city ? (<span>{errors.city}</span>) : null}
                                                </div>


                                                <p>
                                                    <div className='profile-input'>
                                                        <label>State</label>
                                                        <select
                                                            name="state"
                                                            value={values.state}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            className='login_Form'
                                                        >
                                                            <option value="" label="Select state" />
                                                            {indianStates.map(state => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {errors.state && touched.state ? (<span>{errors.state}</span>) : null}
                                                </p>

                                                <button type="submit" className="cart-btn">Update Profile</button>
                                                <Link to={'/changePassword'}><button className="cart-btn">Change Password</button></Link>


                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>

            <Footer />
        </>
    )
}
