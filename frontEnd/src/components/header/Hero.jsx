import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Search from './Search'
import Profile from './account/Profile'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import axios from 'axios'
import { API_BASE_URL } from "../../config";
import { BsCartFill } from 'react-icons/bs'
const Head = () => {

  const [categorylist, setCategorylist] = useState([]);
  const [category, setCategory] = useState("");

  var config = {
    method: 'get',
    url: `${API_BASE_URL}/category/list`,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    axios.defaults.withCredentials = true
    axios(config)
      .then((res) => {
        setCategorylist(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSetCategory = (e) => {
    if (e.target.value !== 'Categories') {
      setCategory(e.target.value);
    } else {
      setCategory("")
    }
  }

  return (
    <>
      <Hero className="hero">
        <HeroWrapper className="wrapper d-flex space-between">
          <Left className="left d-flex row">
            <Brand className="brand">
              <Link to="/" className="white">Fourn-E-Tech</Link>
            </Brand>
            <Div></Div>
          </Left>
          <Middle className="middle flex">
            <Categories id="categories" className='flex'>
              <Span className='fa-solid fa-border-all'></Span>
              <Title>
                <select onChange={(e) => { handleSetCategory(e) }}>
                  <option>Categories</option>
                  {categorylist.map((categories) => (
                    <option value={categories.name} key={categories.id}>{categories.name.charAt(0).toUpperCase() + categories.name.slice(1)}</option>
                  ))}
                </select>
              </Title>
            </Categories>
            <Search placeholder="Que recherchez-vous ?" category={category} />
          </Middle>
          <Right className="right d-flex row space-between RText">
            <Profile className="profile-icon" />
              <Link to="/cart" className="cart-icon white">
            <BsCartFill />
            </Link>
          </Right>
        </HeroWrapper>
      </Hero>
    </>
  )
}

const Hero = styled.header``
const HeroWrapper = styled.div``
const Left = styled.div``
const Middle = styled.div``
const Categories = styled.div``
const Span = styled.span``
const Brand = styled.h1``
const Right = styled.div``
const Title = styled.h3``
const Div = styled.div``


export default Head
