import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
import { RelatedProducts } from './RelatedProducts'


export const SingleProduct = () => {

    const accessToken = localStorage.getItem('fruitKhaToken')

    const location = useLocation();

    const {productName, price, image, _id} = location.state || {productName : "Strawberry", price : 85, image : "1713477022407-product-img-1.jpg", _id : "66219674dc7babb56e3bb68b"};



    const myObj = {
        title: productName,
        desc: "FRESH FRUITS"
    }

    const [qty, setQty] = useState({ val: 1 })

    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setQty({ val: value })
    }

    const [cartMsg, setCartMsg] = useState("")

    const addToCart = (e) => {
        e.preventDefault();

        const body = {
            productId: _id,
            quantity: qty.val
        }

        axios.post("https://fruitkha-production.up.railway.app/products/addToCart", body, {
            headers: {
                'Authorization': accessToken,
            },
        }).then((response) => {
            setCartMsg(response.data.message)
        }).catch((error) => {
            setCartMsg(error.response.data.message)
        });
    }

    const deleteCartMsg = () => {
        setTimeout(() => {
            setCartMsg(null);
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    if (cartMsg) {
        deleteCartMsg();
    }
    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />

            <div class="single-product mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="single-product-img">
                                <img src={`https://fruitkha-production.up.railway.app/uploads/${image}`} alt="" />
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="single-product-content">
                                <h3>{productName}</h3>
                                <p class="single-product-pricing"><span>Per Kg</span> ${price}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta sint dignissimos, rem commodi cum voluptatem quae reprehenderit repudiandae ea tempora incidunt ipsa, quisquam animi perferendis eos eum modi! Tempora, earum.</p>
                                <div class="single-product-form">
                                    <form>
                                        <input type="number" name="quantity" value={qty.val} min="1" onChange={handleChange} placeholder="0" />
                                    </form>
                                    <span onClick={(e) => addToCart(e)} class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</span>
                                    {
                                        cartMsg ? <p className="signUpMsg2">{cartMsg}</p> : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedProducts />
            <Footer />
        </>
    )
}
