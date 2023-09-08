import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BiEuro, BiCart } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';

const Product = () => {

   const location = useLocation();
   const url = location.pathname.split("/")
   const id_product = url[2]
   const navigate = useNavigate();

   const [product, setProduct] = useState([]);
   const [images, setImages] = useState([]);
   const [firstImage, setFirstimage] = useState('');

   const routeCart = () => {
      navigate("/cart");
   }

   const routeLikes = () => {
      navigate("/wishlisht")
   }

   useEffect(() => {
      var config = {
         method: 'get',
         url: `${API_BASE_URL}/product/list/${id_product}`,
         headers: {
            "Access-Control-Allow-Origin": "*",
         }
      };

      axios.defaults.withCredentials = true

      axios(config)
         .then(function (response) {
            setProduct(response.data);
            setImages(response.data.pictures)
            setFirstimage(response.data.pictures[0].picture)
            console.log(response.data.references);
         })
         .catch(function (error) {
            console.log(error);
         });
   }, [location]);

   if (product.length === 0) {
      return (
         <>
            <Section className="article-section">
               <Title>No Product Found</Title>
            </Section>
         </>
      )
   } else {
      return (
         <>
            <Section className="article-section">
               <Wrapper className="product-container container grid">
                  <Card className="product-cards d-grid col-2">
                     <ImageBox className="product-thumb">
                        {product.reduction !== 0 ? <Discount className="product__discount">-{product.reduction}%</Discount> : <></>}
                        <Images className="product__images">
                           <Img src={`${API_PUBLIC_URL + firstImage}`} alt="Product Thumbnail" className="product__thumbnail" />
                           <div>
                              {
                                 images.map((item) => (
                                    <Img src={`${API_PUBLIC_URL + item.picture}`} key={item.id} alt="Product Thumbnail" />
                                 ))
                              }
                           </div>
                        </Images>
                     </ImageBox>
                     <ProductDetails className="product-details d-grid">
                        <Div className="product-hero d-flex flex-row space-between">
                           <Div className="d-flex flex-col">
                              <Name className="product__name text-dark">{product.name}</Name>
                              <Rate className="product__rate">
                                 <AiFillStar />
                                 <AiFillStar />
                                 <AiFillStar />
                                 <AiFillStar />
                                 <AiOutlineStar />
                              </Rate>
                           </Div>
                           <Div className="d-flex flex-col">
                              <Price className="product__price">
                                 {product.price}
                                 <Currency className="product__currency"><BiEuro /></Currency>
                              </Price>
                              <Div>
                              </Div>
                           </Div>
                        </Div>
                        <Description className="product__description text-dark">{product.description}</Description>
                        <References className="product__details">
                           {
                              product.references.map((item, k) => (
                                 <Details key={k} className="d-grid details">
                                    <ColorCheck className="product__color f-flex">
                                       <h3>Couleur: </h3>
                                       <p htmlFor="pink">{item.color}</p>
                                       <p htmlFor="pink">{item.color}</p>
                                       <p htmlFor="pink">{item.color}</p>
                                    </ColorCheck>
                                    <Size className="product__size f-flex">
                                       <h3>Taille: </h3>
                                       <p>{item.size} cm</p>
                                    </Size>
                                    <Weight className="product__weight f-flex">
                                       <h3>Poids: </h3>
                                       <p>{item.weight} g</p>
                                    </Weight>
                                    <Stock className="product__stock f-flex">
                                       <h3>Stock: </h3>
                                       <p>{item.stock}</p>
                                    </Stock>
                                    <Category className="product__category f-flex">
                                       <h3>Categorie: </h3>
                                       <p>Telephone,</p>
                                       <p>Apple</p>
                                    </Category>
                                 </Details>
                              ))
                           }
                        </References>
                        <CTA className="cta">
                           <Button 
                              className="btn btn-cart" 
                              onClick={routeCart}
                           >
                              Ajouter au panier 
                              <BiCart />
                           </Button>
                           <Button 
                              className="btn btn-love"
                              onClick={routeLikes}
                           >
                              <AiOutlineHeart />
                           </Button>
                        </CTA>
                     </ProductDetails>
                  </Card>
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
const ImageBox = styled.div``
const Images = styled.div``
const Img = styled.img``
const Discount = styled.span``
const Div = styled.div``
const Name = styled.h2``
const Rate = styled.div``
const Price = styled.div``
const Currency = styled.span``
const Description = styled.p``
const ProductDetails = styled.div``
const References = styled.div``
const Details = styled.div``
const ColorCheck = styled.div``
const Size = styled.div``
const Weight = styled.div``
const Stock = styled.div``
const Category = styled.div``
const CTA = styled.div``
const Button = styled.button``

export default Product