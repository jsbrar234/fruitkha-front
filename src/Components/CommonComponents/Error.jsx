import React from 'react'
import { BreadCrumb } from './BreadCrumb';
import { Footer } from './Footer';
import Navbar from './Navbar';

export const Error = () => {
    const accessToken = localStorage.getItem('fruitKhaToken');
    const myObj = {
        title : "404 NOT FOUND",
        desc : "BUY FRESH AND ORGANIC FRUITS"
    }
  return (
    <>
        <Navbar data={accessToken}/>
        <BreadCrumb data={myObj}/>
        <Footer/>
    </>
  )
}
