"use client"
import React from 'react'
import Navbar from './Navbar'
// import { SessionProvider } from 'next-auth/react'

const Nav = ({setsearch}) => {
  return (
    <>
      <Navbar setsearch={setsearch}/>
    </>
  )
}

export default Nav
