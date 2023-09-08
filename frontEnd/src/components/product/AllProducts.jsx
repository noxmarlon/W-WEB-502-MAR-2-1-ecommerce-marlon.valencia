import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import { BiEuro, BiCart } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';
import CartButton from '../../common/Cart/services/cart.service'

const ProductsList = () => {
   const navigate = useNavigate();
   const [allProducts, setAllProducts] = useState([]);

   const routeCart = () => {
      navigate("/cart");
   }

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
            console.log(res.data);

            setAllProducts(res.data.products);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const listProducts = allProducts.map((product) => (
      <Cards className="hover products-cards">
            <Link to={`/product/${product.id}`} key={product.id}>
            <Image className="products__thumb">
               {product.reduction !== 0 ? <Discount className="products__discount">-{product.reduction}%</Discount> : <></>}
               <Img src={`${API_PUBLIC_URL + product.pictures[0].picture}`} alt="Product Thumbnail" />
            </Image>
            </Link>
            <Details className="products-details">
               <Link to={`/product/${product.id}`} key={product.id}>
                  <Name className="products__name text-dark">{product.name}</Name>
                  <Rate className="product__rate">
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiOutlineStar />
                  </Rate>
               </Link>
               <Price className="products__price">
                  {product.price}
                  <Currency className="products__currency"><BiEuro /></Currency>
               </Price>
               <CTA className="cta">
                  <Button className="btn btn-cart" onClick={routeCart}>
                     Ajouter<BiCart />
                  </Button>
                  <Button className="btn btn-love">
                     <AiOutlineHeart />
                  </Button>
               </CTA>
            </Details>
         </Cards>
   )
   )

   if (allProducts.length === 0) {
      return (
         <>
            <Section className="articles-section">
               <Title className="articles-title">No product found</Title>
            </Section>
         </>
      )
   } else {
      return (
         <>
            <Section className="articles-section">
               <Title className="articles-title">Articles</Title>
               <Wrapper className="articles-container container grid col-4">
                  {listProducts}
               </Wrapper>
            </Section>
         </>
      )
   }
}

const Section = styled.section``
const Title = styled.h2``
const Wrapper = styled.div``
const Cards = styled.div``
const Image = styled.div``
const Img = styled.img``
const Discount = styled.span``
const Name = styled.h2``
const Rate = styled.div``
const Price = styled.div``
const Currency = styled.span``
const Details = styled.div``
const CTA = styled.div``
const Button = styled.button``

export default ProductsList