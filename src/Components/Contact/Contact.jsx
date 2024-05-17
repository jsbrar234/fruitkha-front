import React from 'react'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
import { ContactForm } from './ContactForm'
import { Location } from './Location'

export const Contact = () => {

  const accessToken = localStorage.getItem('fruitKhaToken');
  const myObj = {
    title: "Contact Us",
    desc: "GET 24/7 SUPPORT"
  }
  return (
    <>

      <Navbar data={accessToken} />
      <BreadCrumb data={myObj} />
      <ContactForm />
      <Location />
      <Footer />
    </>
  )
}
