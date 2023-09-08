import React from "react"
import Hero from "./Hero"
import Navbar from "./Navbar"
import styled from 'styled-components'

const Header = ({ CartItem }) => {
  return (
    <>
      <Hero />
      <Navbar />
    </>
  )
}

const SearchBar = styled.div``

export default Header