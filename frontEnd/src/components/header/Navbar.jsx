import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from 'styled-components'
import axios from 'axios'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';
import { AiFillHome } from 'react-icons/ai'
import { BsFillCartFill, BsFillHeartFill } from 'react-icons/bs'
import { CgMenuGridR } from 'react-icons/cg'
import { MdAccountCircle } from 'react-icons/md'

const Navbar = () => {

  const [isAdmin, setAdmin] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation()
  const getAdmin = async () => {
    const res = await axios.get(`${API_BASE_URL}/testrole `, {
      headers: {
        'x-access-token': token
      },
    });
    setAdmin(res.data);
  }
  useEffect(() => {
    if (token) {
      getAdmin();
    }else
    {
      setAdmin(false)
    }
  }, [location, token]);

  // Toogle Menu

  return (
    <>
      <Hero id='navbar-hero'>
        <NavbarWrapper className='navbar container f-flex'>
          <Hyperlinks className='navlink mg-auto'>
            <Links id="navlinks" className={"nav-links-MobileMenu"} >
              <Li className="home">
                <Link to='/' className="hidden">
                  <Span className="text">Accueil</Span>
                  <AiFillHome className="icon"/>
                </Link>
              </Li>
              <Li className="articles">
                <Link to='/articles' className="hidden"> 
                  <Span className="text">Articles</Span>
                  <CgMenuGridR className="icon"/>
                </Link>
              </Li>
              <Li className="cart">
                <Link  to='/cart'>
                  <Span className="text">Cart</Span>
                  <BsFillCartFill className="icon"/>
                </Link>
              </Li>
              {isAdmin && (
                <Li>
                  <Link to='/admin' className="link-admin">Admin</Link>
                </Li>
              )}
              <Li className="love">
                <Link  to='/wishlist'>
                  <Span className="text">Love</Span>
                  <BsFillHeartFill className="icon"/>
                </Link>
              </Li>
              <Li className="account">
                <Link to='/user' className="hidden">
                  <Span className="text">Compte</Span>
                  <MdAccountCircle className="icon"/>
                </Link>
              </Li>
              
            </Links>
          </Hyperlinks>
        </NavbarWrapper>
      </Hero>
    </>
  )
}

const Hero = styled.nav``
const NavbarWrapper = styled.div``
const Span = styled.span``
const Hyperlinks = styled.div``
const Links = styled.ul``
const Li = styled.li``


export default Navbar