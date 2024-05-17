import React from 'react'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
import { ShopProducts } from './ShopProducts'

export const Shop = () => {

    const accessToken = localStorage.getItem('fruitKhaToken');

    const myObj = {
        title: "Shop",
        desc: "FRESH AND ORGANIC"
    }
    return (
        <>
            <Navbar data={accessToken} />
            <BreadCrumb data={myObj} />
            <ShopProducts />
            <Footer />
        </>
    )
}
