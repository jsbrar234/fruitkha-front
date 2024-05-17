import React from 'react'
import { BreadCrumb } from '../CommonComponents/BreadCrumb'
import { Footer } from '../CommonComponents/Footer'
import { Navbar } from '../CommonComponents/Navbar'
import { ShopBanner } from '../CommonComponents/ShopBanner'
import { Team } from '../CommonComponents/Team'
import { Testimonial } from '../CommonComponents/Testimonial'
import { FeaturesAbout } from './FeaturesAbout'

export const About = () => {
  const accessToken = localStorage.getItem('fruitKhaToken');
  const myObj = {
    title: "About Us",
    desc: "WE SALE FRESH FRUITS"
  }

  return (
    <>

      <Navbar data={accessToken} />
      <BreadCrumb data={myObj} />
      <FeaturesAbout />
      <ShopBanner />
      <Team />
      <Testimonial />
      <Footer />
    </>
  )
}
