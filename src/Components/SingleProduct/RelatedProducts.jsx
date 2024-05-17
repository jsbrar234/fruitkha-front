import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const RelatedProducts = () => {

	const [data, setData] = useState([])

	useEffect(() => {
		getData();
	}, [])

	let accessToken = localStorage.getItem('fruitKhaToken')

	// const [cartMsg, setCartMsg] = useState({ msg: "", prodId: "" })
	const getData = () => {
		axios.get("https://fruitkha-production.up.railway.app/products/similarProducts").then((response) => {
			setData(response.data.data)
			console.log('response.data.data', response.data.data)
		}).catch((err) => {
			console.log('error', err)
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

	return (
		<>
			<div class="more-products mb-150">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 offset-lg-2 text-center">
							<div class="section-title">
								<h3><span class="orange-text">Related</span> Products</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
							</div>
						</div>
					</div>
					<div class="row">
						{
							data.map((curElm) => {
								return (
									<div class="col-lg-4 col-md-6 text-center strawberry">
										<div class="single-product-item">
											<div class="product-image">
												<Link to={`/single-product`} state={curElm}><img onClick={() => getData()} src={`https://fruitkha-production.up.railway.app/uploads/${curElm.image}`} alt="" /></Link>
											</div>
											<h3>{curElm.productName}</h3>
											<p class="product-price"><span>Per Kg</span> {curElm.price}$ </p>
											<Link to='/single-product' onClick={() => getData()} state={curElm}><span class="cart-btn"><i class="fas fa-shopping-cart"></i> Buy Now</span></Link>

										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}
