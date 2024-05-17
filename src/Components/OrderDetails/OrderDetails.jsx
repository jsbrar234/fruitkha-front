import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'

export const OrderDetails = () => {

    let accessToken = localStorage.getItem('fruitKhaToken')

    const myObj = {
        title: "Orders",
        desc: "FRESH AND ORGANIC FRUITS"
    }

    const [data, setData] = useState([])

    useEffect(() => {
        getOrderDetails();
    }, [accessToken])


    const getOrderDetails = () => {
        axios.get("https://fruitkha-production.up.railway.app/products/getOrderDetails", {
            headers: {
                Authorization: accessToken
            }
        }).then((response) => {
            setData(response.data.data)
            console.log('response.data.data', response.data.data)
        }).catch((error) => {
            toast.error("Please Login Your Account", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log('error', error)
        });
    }


    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            {
                data.length > 0 ? <div class="cart-section mt-150 mb-150">
                    <div class="container">
                        <div class="row text-align-center">
                            <div class="col-lg-12 col-md-12">
                                <h1>Order Details</h1>

                                <div class="cart-table-wrap">
                                    <table class="cart-table">
                                        <thead class="cart-table-head">
                                            <tr class="table-head-row">
                                                <th class="product-image">Product</th>
                                                <th class="product-name">Name</th>
                                                <th class="product-price">Price</th>
                                                <th class="product-quantity">Quantity</th>
                                                <th class="product-total">Total</th>
                                                <th class="product-price">Address</th>
                                                <th class="product-total">Ordered On</th>
                                                <th class="product-total">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((curElm) => {
                                                    return (
                                                        <>

                                                            <tr class="table-body-row">
                                                                <td class="product-image"><img src={`https://fruitkha-production.up.railway.app/uploads/${curElm.productDetails.image}`} alt="" /></td>
                                                                <td class="product-name">{curElm.productDetails.productName}</td>
                                                                <td class="product-price">${curElm.productDetails.price}</td>
                                                                <td class="product-quantity">{curElm.products.quantity}</td>
                                                                <td class="product-total">${curElm.productDetails.price * curElm.products.quantity}</td>
                                                                <td class="product-quantity">{curElm.addressDetails.fullName}, {curElm.addressDetails.pincode}, {curElm.addressDetails.houseNo}, {curElm.addressDetails.area} {curElm.addressDetails.city}, {curElm.addressDetails.state}</td>
                                                                <td class="product-total">{new Date(curElm.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</td>
                                                                <td class="product-total">{curElm.status}</td>

                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : <>
                        <div class="container">
                            <div class="row text-align-center">
                                <div class="col-lg-12">
                                    <div className='empty_cart'>
                                        <h1>You Have Not Placed Any Order</h1>

                                        <div class="hero-btns">
                                            <h3>Go for Shopping</h3>
                                            <Link to='/shop' class="boxed-btn">Shop</Link>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }




            <Footer />
        </>
    )
}
