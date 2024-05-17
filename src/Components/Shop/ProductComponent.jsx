import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ProductComponent = () => {

    let accessToken = localStorage.getItem('fruitKhaToken')
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        getData()
    }, [searchValue])


    const [data, setData] = useState([])

    // const [cartMsg, setCartMsg] = useState({ msg: "", prodId: "" })

    const getData = () => {
        axios.get("https://fruitkha-production.up.railway.app/products/getProducts", {
            params: {
                query: searchValue
            }
        }).then((response) => {
            setData(response.data.data)
        })
    }

    // const addToCart = (prodId) => {

    //     const body = {
    //         productId: prodId,
    //         quantity: 1
    //     }

    //     axios.post("https://fruitkha-production.up.railway.app/products/addToCart", body, {
    //         headers: {
    //             'Authorization': accessToken,
    //         },
    //     }).then((response) => {
    //         setCartMsg({ msg: response.data.message, prodId: prodId })
    //     }).catch((error) => {
    //         setCartMsg({ msg: error.response.data.message, prodId: prodId })
    //     });
    // }
    // const deleteCartMsg = () => {
    //     setTimeout(() => {
    //         setCartMsg({ msg: "", prodId: "" });
    //     }, 3000); // 3000 milliseconds = 3 seconds
    // };

    // if (cartMsg.msg) {
    //     deleteCartMsg();
    // }


    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }
    return (
        <>
            <div className='row justify-content-center'>
                <div className='col-lg-3'>
                    <div className='shop-search'>
                        <label>Search</label>
                        <input type="text" onChange={handleSearch} placeholder="Search Here" id="name" />
                    </div>
                </div>
            </div>

            

            {

                data.map((curElm) => {
                    return (
                        <div class="col-lg-4 col-md-6 text-center strawberry">
                            <div class="single-product-item">
                                <div class="product-image">
                                    <Link to={`/single-product`} state={curElm}><img src={`https://fruitkha-production.up.railway.app/uploads/${curElm.image}`} alt="" /></Link>
                                </div>
                                <h3>{curElm.productName}</h3>
                                <p class="product-price"><span>Per Kg</span> {curElm.price}$ </p>
                                <Link to={`/single-product`} state={curElm}><span class="cart-btn"><i class="fas fa-shopping-cart"></i> Buy Now</span></Link>
                                
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
