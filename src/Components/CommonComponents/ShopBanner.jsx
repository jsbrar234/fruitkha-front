import React from 'react'
import { Link } from 'react-router-dom'

export const ShopBanner = () => {
  return (
    <>
        <section class="shop-banner">
    	<div class="container">
        	<h3>December sale is on! <br/> with big <span class="orange-text">Discount...</span></h3>
            <div class="sale-percent"><span>Sale! <br/> Upto</span>50% <span>off</span></div>
            <Link to='/shop' class="cart-btn btn-lg">Shop Now</Link>
        </div>
    </section>
    </>
  )
}
