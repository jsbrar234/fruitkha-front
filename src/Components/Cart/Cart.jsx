import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
import { addData } from '../ReduxStore/Slice/UserSlice'

export const Cart = () => {

    const accessToken = localStorage.getItem('fruitKhaToken')

    const myObj = {
        title: "Cart",
        desc: "FRESH AND ORGANIC"
    }

    useEffect(() => {
        getData();
    }, [])

    const navigate = useNavigate()


    const delCharge = 45;

    const [data, setData] = useState([])

    const getData = () => {

        axios.get("https://fruitkha-production.up.railway.app/products/getCart", {
            headers: {
                'Authorization': accessToken,
            },
        }).then((response) => {
            setData(response.data.data)

        }).catch((error) => {
            console.log(error.response.data.message)
        });
    }

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let dummy = 0;
        data.map((curElm) => {
            dummy += curElm.productDetails.price * curElm.quantity
        })
        setTotal(dummy)
    }, [data])

    const [qty, setQty] = useState()

    const handleChange = (e, pId) => {
        const { value } = e.target

        const updatedData = data.map((item) => {
            if (item.productDetails._id === pId) {
                return { ...item, quantity: parseInt(value) };
            }
            return item;
        });

        setData(updatedData)

        const body = {
            productId: pId,
            quantity: value
        }

        axios.post("https://fruitkha-production.up.railway.app/products/addToCart", body, {
            headers: {
                'Authorization': accessToken,
            },
        }).then((response) => {
            console.log(response.data.message)
        }).catch((error) => {
            console.log(error.response.data.message)
        });
    }

    const deleteFromCart = (pId) => {
        axios.delete("https://fruitkha-production.up.railway.app/products/deleteFromCart", {
            headers: {
                'Authorization': accessToken,
            }, data: {
                productId: pId
            }
        }).then((response) => {
            console.log(response.data.message)
            getData();
        }).catch((error) => {
            console.log(error.response.data.message)
        });
    }

    const goToCheckout = (total) => {
        navigate("/checkout", { state: { data: total + delCharge } });
    }

    const dispatch = useDispatch();


    const cartItems = () => {
        dispatch(addData(data))
    }


    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            {
                data.length > 0 ? <><div class="cart-section mt-150 mb-150">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 col-md-12">
                                <div class="cart-table-wrap">
                                    <table class="cart-table">
                                        <thead class="cart-table-head">
                                            <tr class="table-head-row">
                                                <th class="product-remove"></th>
                                                <th class="product-image">Product Image</th>
                                                <th class="product-name">Name</th>
                                                <th class="product-price">Price</th>
                                                <th class="product-quantity">Quantity</th>
                                                <th class="product-total">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((curElm) => {
                                                    return (
                                                        <>

                                                            <tr class="table-body-row">
                                                                <td class="product-remove"><i onClick={() => deleteFromCart(curElm.productDetails._id)} class="far fa-window-close"></i></td>
                                                                <td class="product-image"><img src={`https://fruitkha-production.up.railway.app/uploads/${curElm.productDetails.image}`} alt="" /></td>
                                                                <td class="product-name">{curElm.productDetails.productName}</td>
                                                                <td class="product-price">${curElm.productDetails.price}</td>
                                                                <td class="product-quantity"><input type="number" name="quantity" value={qty ? qty : curElm.quantity} onChange={(e) => handleChange(e, curElm.productDetails._id)} placeholder="0" /></td>
                                                                <td class="product-total">1</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
                                                <td>{total}</td>
                                            </tr>
                                            <tr class="total-data">
                                                <td><strong>Shipping: </strong></td>
                                                <td>${delCharge}</td>
                                            </tr>
                                            <tr class="total-data">
                                                <td><strong>Total: </strong></td>
                                                <td>{total + delCharge}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="cart-buttons">
                                        {/* <span class="cart-btn">Update Cart</span> */}
                                        <span onClick={() => { goToCheckout(total); cartItems(); }} className="cart-btn">Check Out</span>
                                    </div>
                                </div>

                                <div class="coupon-section">
                                    <h3>Apply Coupon</h3>
                                    <div class="coupon-form-wrap">
                                        <form>
                                            <p><input type="text" placeholder="Coupon" /></p>
                                            <span className='cart-btn'>Apply</span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></> :
                    <>
                        <div class="container">
                            <div class="row text-align-center">
                                <div class="col-lg-12">
                                    <div className='empty_cart'>
                                        <h1>Your Cart is Empty</h1>

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
