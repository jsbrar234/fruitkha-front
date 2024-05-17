import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = (props) => {

  const { Component } = props

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('fruitKhaToken')

    if (!accessToken) {
      navigate('/login')
    }
  })


  return (
    <>
      <Component />
    </>
  )
}
