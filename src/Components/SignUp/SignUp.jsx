import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { signupschema } from '../../signupSchema';
import { BreadCrumb } from '../CommonComponents/BreadCrumb';
import { Footer } from '../CommonComponents/Footer';
import { Navbar } from '../CommonComponents/Navbar';

export const SignUp = () => {
    const accessToken = localStorage.getItem('fruitKhaToken');

    const myObj = {
        title: "Sign Up",
        desc: "BUY FRESH FRUITS"
    };

    const [resp, setResp] = useState({ success: "", error: "" });

    const initialValues = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
        dateOfBirth: "",
        gender: "",
        pincode: "",
        city: "",
        state: ""
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signupschema,
        onSubmit: async (values, action) => {
            const body = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                email: values.email,
                password: values.password,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
                pincode: values.pincode,
                city: values.city,
                state: values.state
            };

            axios.post("https://fruitkha-production.up.railway.app/users/signUp", body).then((response) => {
                action.resetForm();
                setResp({ success: response.data.message });
            }).catch((error) => {
                setResp({ error: error.response.data.message });
            });
        }
    });

    // Calculate the maximum allowable date for 18 years old
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxDateString = maxDate.toISOString().split('T')[0];

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            <div className="contact-from-section mt-150 mb-150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="form-title">
                                <h2>Sign Up</h2>
                            </div>
                            <div id="form_status"></div>
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <p>
                                        <input
                                            type='text'
                                            name="firstName"
                                            value={values.firstName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='First Name'
                                            className='login_Form'
                                        />
                                        {errors.firstName && touched.firstName ? (<span>{errors.firstName}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='text'
                                            name="lastName"
                                            value={values.lastName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Last Name'
                                            className='login_Form'
                                        />
                                        {errors.lastName && touched.lastName ? (<span>{errors.lastName}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='text'
                                            name="phone"
                                            value={values.phone}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Phone No.'
                                            className='login_Form'
                                        />
                                        {errors.phone && touched.phone ? (<span>{errors.phone}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='text'
                                            name="email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Email'
                                            className='login_Form'
                                        />
                                        {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='password'
                                            name="password"
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Enter Password'
                                            className='login_Form'
                                        />
                                        {errors.password && touched.password ? (<span>{errors.password}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='password'
                                            name="cpassword"
                                            value={values.cpassword}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Confirm Password'
                                            className='login_Form'
                                        />
                                        {errors.cpassword && touched.cpassword ? (<span>{errors.cpassword}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='date'
                                            name="dateOfBirth"
                                            value={values.dateOfBirth}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            max={maxDateString}
                                            placeholder='Date of Birth'
                                            className='login_Form'
                                        />
                                        {errors.dateOfBirth && touched.dateOfBirth ? (<span>{errors.dateOfBirth}</span>) : null}
                                    </p>
                                    <p>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                checked={values.gender === 'male'}
                                            />
                                            Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                checked={values.gender === 'female'}
                                            />
                                            Female
                                        </label>
                                        {errors.gender && touched.gender ? (<span>{errors.gender}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='text'
                                            name="pincode"
                                            value={values.pincode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='Pincode'
                                            className='login_Form'
                                        />
                                        {errors.pincode && touched.pincode ? (<span>{errors.pincode}</span>) : null}
                                    </p>
                                    <p>
                                        <input
                                            type='text'
                                            name="city"
                                            value={values.city}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder='City'
                                            className='login_Form'
                                        />
                                        {errors.city && touched.city ? (<span>{errors.city}</span>) : null}
                                    </p>
                                    <p>
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
                                        {errors.state && touched.state ? (<span>{errors.state}</span>) : null}
                                    </p>
                                    <p className='submitBtn'>
                                        <input type="submit" value="Submit" />
                                    </p>
                                </form>
                                {
                                    resp.error ? (
                                        <p className="signUpMsg">{resp.error}</p>
                                    ) : (
                                        resp.success && <p className="signUpMsg2">{resp.success}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
