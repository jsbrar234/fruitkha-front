import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
const Stripe = require('stripe');
const stripe = Stripe('pk_test_51P7mtVP2juis5ZCNO34S69YvErceIxhftauat6XuWTam0peJsTLIYhc7SGW2DZnj24nhUDMXCWV3v0ocXDrDoPD3009RlCWQ5r');

export const Checkout = (props) => {

    const accessToken = localStorage.getItem('fruitKhaToken')

    const myObj = {
        title: "Checkout",
        desc: "FRESH AND ORGANIC"
    }

    const location = useLocation();
    const total = location.state.data

    const navigate = useNavigate();


    const initialValues = { fullName: "", mobile: "", pincode: "", houseNo: "", area: "", city: "", state: "" }


    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit:
            async (values, action) => {
                const body = {
                    fullName: values.fullName,
                    mobile: values.mobile,
                    pincode: values.pincode,
                    houseNo: values.houseNo,
                    area: values.area,
                    city: values.city,
                    state: values.state
                };


                axios.post("https://fruitkha-production.up.railway.app/users/addAddress", body, {
                    headers: {
                        Authorization: accessToken
                    }
                }).then((response) => {
                    action.resetForm();
                    getAddress();
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
                    toast.error("Failed to Add Address, Please Enter All Details Correctly", {
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
    })

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAddress();
        getPaymentMethods();
    }, [accessToken])


    const getAddress = () => {
        axios.post("https://fruitkha-production.up.railway.app/users/getAddress", {}, {
            headers: {
                Authorization: accessToken
            }
        }).then((response) => {
            setData(response.data.data)
            console.log("response.data.data", response.data.data)
        }).catch((error) => {
            setData({ error: error.response.data.message });
        });
    }

    const [card, setCard] = useState({ number: "", month: "", year: "", cvc: "" });


    const cardHandleChange = (event) => {
        const name = event.target.name;
        const val = event.target.value;
        setCard({ ...card, [name]: val })
        console.log('card', card)
    }

    const cardSubmit = async (e) => {

        e.preventDefault();

        if (card.number == "") {
            return alert("ENTER YOUR CARD NUMBER")
        }
        if (card.month == "") {
            return alert("ENTER MONTH")
        }
        if (card.year == "") {
            return alert("ENTER YEAR")
        }
        if (card.cvc == "") {
            return alert("ENTER CVC")
        }


        const token = await stripe.tokens.create({
            card: {
                number: card.number,
                exp_month: card.month,
                exp_year: card.year,
                cvc: card.cvc,
            },
        }).catch((error) => {
            toast.error("Failed to add card, check whether you entered correct details", {
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



        if (token) {
            const body = {
                token: token.id
            }
            axios.post("https://fruitkha-production.up.railway.app/payments/createPaymentMethod", body, {
                headers: {
                    Authorization: accessToken
                }
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
                setCard({ number: "", month: "", year: "", cvc: "" })
                getPaymentMethods();
            }).catch((error) => {
                toast.error("Failed To Add Card", {
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

    const [paymentMethods, setPaymentMethods] = useState([]);

    const getPaymentMethods = () => {
        setLoading(true); // Set loading to true when starting the request
        axios.get("https://fruitkha-production.up.railway.app/payments/getCustomerPaymentMethods", {
            headers: {
                Authorization: accessToken
            }
        }).then((response) => {
            setPaymentMethods(response.data.data.data);
            setLoading(false); // Set loading to false when data fetching is complete
        }).catch((error) => {
            console.log("ErrOR", error)
            setLoading(false); // Set loading to false on error
            toast.error("Failed to Load Payment Methods, check your internet connection", {
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

    const [paymentMethodId, setpaymentMethodId] = useState({ paymentId: "" })

    const selectCardChange = (e) => {
        setpaymentMethodId({ paymentId: e.target.value })
    }

    const cartData = useSelector((state) => {
        return state.cart;
    })

    const [onlyData, setOnlyData] = useState([])

    const [address, setAddress] = useState("")

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const clearCart = () => {
        axios.get("https://fruitkha-production.up.railway.app/products/clearCart", {
            headers: {
                Authorization: accessToken
            }
        }).then((response) => {
            console.log('cart cleared')
        }).catch((error) => {
            console.log("{ error: error.response.data.message }");
        });
    }



    const makePayment = () => {

        cartData.map((curElm) => {
            const tempData = {
                productId: curElm.productDetails._id,
                quantity: curElm.quantity
            }
            onlyData.push(tempData)
        })



        if (!paymentMethodId.paymentId) {
            return toast.error("Please Select Card For Payment", {
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

        if (!address) {
            return toast.error("Please Select Address", {
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
            amount: total,
            paymentMethodId: paymentMethodId.paymentId,
        }

        const payment = axios.post("https://fruitkha-production.up.railway.app/payments/makePayment", body, {
            headers: {
                Authorization: accessToken
            }
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

        if (payment) {


            const body = {
                products: onlyData,
                paymentMethodId: paymentMethodId.paymentId,
                totalAmount: total,
                addressId: address
            }


            axios.post("https://fruitkha-production.up.railway.app/products/placeOrder", body, {
                headers: {
                    Authorization: accessToken
                }
            }).then((response) => {
                clearCart();
                setOnlyData([])
                setpaymentMethodId({ paymentId: "" });
                setAddress("")
                navigate('/order-successfull')
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
    const months = [
        { value: '01' },
        { value: '02' },
        { value: '03' },
        { value: '04' },
        { value: '05' },
        { value: '06' },
        { value: '07' },
        { value: '08' },
        { value: '09' },
        { value: '10' },
        { value: '11' },
        { value: '12' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);


    return (
        <>
            <Navbar data={accessToken} />

            <BreadCrumb data={myObj} />
            <div class="cart-section mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <div className='addAddressmain'>
                                <h2>Add Your Address</h2>
                                <div className='addressInput'>
                                    <button type="button" class="btn addAddressBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Add Address
                                    </button>


                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Add Address</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className='addAdressInput'>
                                                            <input type='text' name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Full Name' />
                                                            <input type='text' name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} placeholder='Mobile Number' />

                                                            <input type='number' name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} placeholder='Pincode' />

                                                            <input type='text' name="houseNo" value={values.houseNo} onChange={handleChange} onBlur={handleBlur} placeholder='House No./Flat No./Building/Apartment' />

                                                            <input type='text' name="area" value={values.area} onChange={handleChange} onBlur={handleBlur} placeholder='Area/Locality' />

                                                            <input type='text' name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder='City' />

                                                            <input type='text' name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} placeholder='State' />

                                                            <button type='submit' className='address-btn'>Add</button>


                                                        </div>
                                                    </form>

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {data.length > 0 ? <div className='showAddress'>

                                        {data.map((curElm, index) => (
                                            <div className='innerShowAddress' key={index}>
                                                <input
                                                    type="radio"
                                                    id={`address${index}`}
                                                    className='radio-btn'
                                                    name="selectedAddress"
                                                    value={curElm._id}
                                                    onChange={handleAddressChange}
                                                // Here you can add onChange handler to handle radio selection
                                                />
                                                <label htmlFor={`address${index}`}>
                                                    <ul key={index}>
                                                        <li><span className='addressName'>{curElm.fullName}</span>, {curElm.area}, {curElm.city}, {curElm.state}, {curElm.pincode}</li>
                                                    </ul>
                                                </label>
                                            </div>
                                        ))}


                                    </div> : null}
                                </div>
                            </div>

                            <>
                                <div className='addCardMain'>
                                    <h2>Add Payment Method</h2>
                                    <button type="button" class="btn addAddressBtn" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                                        Add Card
                                    </button>


                                    <div class="modal fade" id="addAddressModal" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="addAddressModalLabel">Add Card</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form onSubmit={cardSubmit}>
                                                        <div className='addAdressInput'>
                                                            <div className='row'>
                                                                <div className='col-lg-12'>
                                                                    <input type='number' name="number" value={card.number} onChange={cardHandleChange} placeholder='Enter Card Number' />
                                                                </div>
                                                                <div className='col-lg-4'>
                                                                    <div className='card-date'>
                                                                    <select name="month" value={card.month} onChange={cardHandleChange} placeholder='Month'>
                                                                        <option value="" disabled>Month</option>
                                                                        {months.map((month) => (
                                                                            <option key={month.value} value={month.value}>
                                                                                {month.value}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <select name="year" value={card.year} onChange={cardHandleChange} placeholder='Year'>
                                                                    <option value="" disabled>Year</option>
                                                                    {years.map((year) => (
                                                                        <option key={year} value={year}>
                                                                            {year}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                    </div>
                                                                </div>

                                                               
                                                            
                                                                

                                                                <div className='col-lg-8'>
                                                                <input type='password' name="cvc" value={card.cvc} onChange={cardHandleChange} placeholder='CVC' />
                                                                </div>

                                                            </div>

                                                            <button type='submit' className='address-btn'>Add</button>

                                                            <p>NOTE : For testing you can use this card. <br /> Card Number : 5555555555554444, for month and year use any future month and year, for cvc use any three digits</p>


                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div className="loader-container-getCard">
                                            <div className="loader-getCard"></div>
                                        </div>
                                    ) : (
                                        paymentMethods.length > 0 ? <div className='showAddress'>
                                            {
                                                paymentMethods.map((curElm, index) => (
                                                    <div className='innerShowAddress' key={index}>
                                                        <input
                                                            type="radio"
                                                            id={`card${index}`}
                                                            className='radio-btn'
                                                            name="selectedCard"
                                                            value={curElm.id}
                                                            onChange={selectCardChange}
                                                        // Here you can add onChange handler to handle radio selection
                                                        />
                                                        <label htmlFor={`card${index}`}>
                                                            <ul key={index}>
                                                                <li><span className='addressName'>{curElm.card.brand}</span> ending in {curElm.card.last4}</li>
                                                            </ul>
                                                        </label>
                                                    </div>
                                                ))
                                            }

                                        </div> : null
                                    )}
                                </div>
                            </>


                        </div>

                        <div class="col-lg-4">
                            <div class="total-section">
                                <table class="total-table">
                                    <thead class="total-table-head">
                                        <tr class="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="total-data">
                                            <td><strong>Subtotal: </strong></td>
                                            <td>${total - 45}</td>
                                        </tr>
                                        <tr class="total-data">
                                            <td><strong>Shipping: </strong></td>
                                            <td>$45</td>
                                        </tr>
                                        <tr class="total-data">
                                            <td><strong>Total: </strong></td>
                                            <td>${total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="cart-buttons">
                                    <span onClick={() => makePayment()} class="cart-btn black">Pay</span>
                                </div>
                            </div>

                            <div class="coupon-section">
                                <h3>Apply Coupon</h3>
                                <div class="coupon-form-wrap">
                                    <form action="index.html">
                                        <p><input type="text" placeholder="Coupon" /></p>
                                        <span className='cart-btn'>Apply</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
