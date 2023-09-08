import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
   Section,
   Title,
   Wrapper,
   Card,
   Image,
   Discount,
   Img,
   Details,
   Name,
   Rate,
   Price,
   Currency,
   CTA,
   Button,
} from './ProductElements'
import { BiDollar, BiCart } from 'react-icons/bi'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';

const FeaturedProducts = () => {
   const [products, setProducts] = useState([]);

   var config = {
      method: 'get',
      url: `${API_BASE_URL}/product/list`,
      headers: {
         "Access-Control-Allow-Origin": "*"
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);
   const fetchProducts = () => {
      axios.defaults.withCredentials = true
      axios(config)
         .then((res) => {
            console.log(JSON.stringify(res.data));
            setProducts(res.data.series);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const listFeaturedProducts = products.map((product) => (
      <Card className="products-cards" key="product.id">
         <Image className="products__thumb">
            {product.reduction !== 0 ? <Discount className="products__discount">-{product.reduction}%</Discount> : <></>}
            <Img src={`${API_PUBLIC_URL + product.product_images[0].picture}`} alt="Product Thumbnail" />
         </Image>
         <Details className="products-details">
            <Name className="products__name text-dark">{product.name}</Name>
            <Rate></Rate>
            <Price className="products__price">
               {product.price}
               <Currency className="products__currency"><BiDollar /></Currency>
            </Price>
            <CTA className="cta">
               <Button className="btn btn-cart">Add<BiCart /></Button>
               <Button className="btn btn-buy">Buy</Button>
            </CTA>
         </Details>
      </Card>
   )
   )
   return (
      <>
         <Section className="featured articles-section container">
            <Title className="articles-title">Featured Products</Title>
            <Wrapper className="articles-container container grid col-4">
               {listFeaturedProducts}
            </Wrapper>
         </Section>
      </>
   )
}

export default FeaturedProducts