import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import { BiEuro, BiCart } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);

   var config = {
      method: 'get',
      url: `${API_BASE_URL}/product/list`,
      headers: {
         "Access-Control-Allow-Origin": "*"
      }
   };

   const fetchProducts = async () => {
      axios.defaults.withCredentials = true
      await axios(config)
         .then((res) => {
            setAllProducts(res.data.products);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const listProducts = allProducts.map((item) => (
         <Cards className="products-cards d-grid">
            <Image className="products__thumb">
               <Img src={`${API_PUBLIC_URL + item.pictures[0].picture}`} alt="Product Thumbnail" />
            </Image>
            <Details className="products-details d-grid">
               <Link to={`/product/${item.id}`} key={item.id}>
                  <Info className="info d-flex">
                     <Info className="stars">
                     <Name className="products__name text-dark">{item.name}</Name>
                     <Rate className="product__rate">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                     </Rate>
                     </Info>
                     <Price className="products__price">
                        {item.price}
                        <Currency className="products__currency"><BiEuro /></Currency>
                     </Price>
                  </Info>
               </Link>
               <Delete className="delete">
                  <Button className="btn btn-delete">Supprimer</Button>
               </Delete>
            </Details>
         </Cards>
   )
   )

   if (allProducts.length === 0) {
      return (
         <>
            <Section className="cart-section">
               <Title className="title">No product found</Title>
            </Section>
         </>
      )
   } else {
      return (
         <>
            <Section className="cart-section">
               <Wrapper className="cart-articles-container container d-grid">
                <Container className="cart-left">
                 <Title className="title">Votre panier</Title>
                  {listProducts}
                </Container>
                  <Container className="cart-right d-flex">
                    <Title className="total">Sous-Total: 950€</Title>
                    <Button className="btn btn-buy">Commander</Button>
                  </Container>
               </Wrapper>
            </Section>
         </>
      )
   }
}

const Section = styled.section``
const Title = styled.h2``
const Wrapper = styled.div``
const Container = styled.div``
const Cards = styled.div``
const Image = styled.div``
const Img = styled.img``
const Info = styled.div``
const Name = styled.h2``
const Rate = styled.div``
const Price = styled.div``
const Currency = styled.span``
const Details = styled.div``
const Delete = styled.div``
const Button = styled.button``


export default Cart