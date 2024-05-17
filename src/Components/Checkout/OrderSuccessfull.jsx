import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'

export const OrderSuccessfull = () => {
  let accessToken = localStorage.getItem('fruitKhaToken')
  const myObj = {
    title: "Order Placed Successfully",
    desc: "Your Order Will be Delivered Soon"
  }
  return (
    <>
      <>
        <Navbar data={accessToken} />
        <div class="breadcrumb-section breadcrumb-bg">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                <div class="breadcrumb-text">
                  <p>Your Order Will be Delivered Soon</p>
                  <h1>Order Placed Successfully</h1>
                  <Link to='/order-details'><span className='cart-btn'>View Orders</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </>
  )
}
