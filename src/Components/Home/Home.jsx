import React from 'react'
import { Testimonial } from '../CommonComponents/Testimonial'
import { Advertisement } from './Advertisement'
import { Features } from './Features'
import { Hero } from './Hero'
import { Footer } from '../CommonComponents/Footer'
import { ProductsSectionHome } from './ProductsSectionHome'
import { Search } from './Search'
import { Navbar } from '../CommonComponents/Navbar'

export const Home = () => {
  const accessToken = localStorage.getItem('fruitKhaToken');
  return (
    <>

      <Navbar data={accessToken} />
      <Hero />
      <Search />
      <Features />
      <ProductsSectionHome />
      <Testimonial />
      <Advertisement />
      <Footer />
    </>
  )
}
