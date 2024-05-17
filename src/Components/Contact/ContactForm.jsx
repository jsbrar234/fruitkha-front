import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




export const ContactForm = () => {

    const navigate = useNavigate();

    const initialValues  = {name  : "", email : "", phone : "", subject : "", message : ""}

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: async (values, actions) => {
            const body = {
                email: values.email,
                phone: values.phone, 
                name : values.name,
                subject : values.subject,
                message : values.message
            };
    
            try {
                const response = await axios.post("https://fruitkha-production.up.railway.app/sendMail/sendFeedback", body);
                actions.resetForm();
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
            } catch (error) {
                console.log("Error during login:", error);
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
            }
        }
    });

    return (
        <>
            <div class="contact-from-section mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mb-5 mb-lg-0">
                            <div class="form-title">
                                <h2>Have you any question?</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p>
                            </div>
                            <div id="form_status"></div>
                            <div class="contact-form">
                                <form id="fruitkha-contact" onSubmit={handleSubmit}>
                                    <p>
                                        <input type="text" onChange={handleChange} onBlur={handleBlur} placeholder="Name" name="name" id="name" />
                                        <input type="text" onChange={handleChange} onBlur={handleBlur} placeholder="Email" name="email" id="email" />
                                    </p>
                                    <p>
                                        <input type="tel" onChange={handleChange} onBlur={handleBlur} placeholder="Phone" name="phone" id="phone" />
                                        <input type="text" onChange={handleChange} onBlur={handleBlur} placeholder="Subject" name="subject" id="subject" />
                                    </p>
                                    <p><textarea name="message" onChange={handleChange} onBlur={handleBlur} id="message" cols="30" rows="10" placeholder="Message"></textarea></p>
                                    <input type="hidden" name="token" value="FsWga4&@f6aw" />
                                    <p><input type="submit" value="Submit" /></p>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="contact-form-wrap">
                                <div class="contact-form-box">
                                    <h4><i class="fas fa-map"></i> Shop Address</h4>
                                    <p>34/8, East Hukupara <br /> Gifirtok, Sadan. <br /> Country Name</p>
                                </div>
                                <div class="contact-form-box">
                                    <h4><i class="far fa-clock"></i> Shop Hours</h4>
                                    <p>MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM </p>
                                </div>
                                <div class="contact-form-box">
                                    <h4><i class="fas fa-address-book"></i> Contact</h4>
                                    <p>Phone: +00 111 222 3333 <br /> Email: support@fruitkha.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
