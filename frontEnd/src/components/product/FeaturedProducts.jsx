import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import { BiEuro, BiCart } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';

const FeaturedProducts = () => {
   const navigate = useNavigate();
	const [products, setProducts] = useState([]);

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

	useEffect(() => {
		fetchProducts();
	}, []);
	
	const fetchProducts = () => {
		axios.defaults.withCredentials = true
		axios(config)
			.then((res) => {
				setProducts(res.data.products);
				console.log(res.data.products);
			})
			.catch((err) => {
				console.log(err);
			});
	};

   const listFeaturedProducts = products.map((product) => (
      <Card className="products-cards hover" key="product.id">
         <Link to={`/product/${product.id}`} key={product.id}>
            <Image className="products__thumb">
               <Discount className="products__discount discount-small">-{product.reduction}%</Discount>
               <Img src={`${API_PUBLIC_URL + product.pictures[0].picture}`}  alt="Product Thumbnail" />
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
         </Card>
   )
   )

	if (products.length === 0) {
		return (
			<>
				<Section className="featured articles-section container">
					<Title className="articles-title">No Product found</Title>
				</Section>
			</>
		)
	} else {
		return (
			<>
				<Section className="featured-articles articles-section container">
					<Title className="articles-title">Top des ventes</Title>
					<Wrapper className="articles-container container grid col-4">
						{listFeaturedProducts}
					</Wrapper>
				</Section>
			</>
		)
	}
}

const Section = styled.section``
const Title = styled.h2``
const Wrapper = styled.div``
const Card = styled.div``
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

export default FeaturedProducts