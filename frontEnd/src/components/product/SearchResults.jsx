import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BiEuro, BiCart } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from 'react-icons/ai'
import { API_BASE_URL, API_PUBLIC_URL } from '../../config';
import CartButton from '../../common/Cart/services/cart.service'

function removeUrlSpace(url) {
    return decodeURIComponent(url).replace(/\s+/g, ' ')
}

const ProductsList = () => {
    const [allCategory, setAllCategory] = useState([]);
    const url = window.location.search
    const location = useLocation()
    const params = new URLSearchParams(url)
    const name = params.get('name')
    const category = params.get('category')
    const str = removeUrlSpace(name)

    var config = {
        method: 'get',
        // url: `${API_BASE_URL}/product/list`,
        url: `${API_BASE_URL}/product/list?name=${str}&category=${category !== null ? category : ""}`,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    const fetchProducts = async () => {
        axios.defaults.withCredentials = true
        await axios(config)
            .then((res) => {
                setAllCategory(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [location]);

    const listProducts = allCategory.map((product) => (
        // category.products.map((product) => (
        <Cards className="hover products-cards" key={product.id}>
            <Link to={`/product/${product.id}`}>
                <Image className="products__thumb">
                    {product.reduction !== 0 ? <Discount className="products__discount">-{product.reduction}%</Discount> : <></>}
                    <Img src={`${API_PUBLIC_URL + product.pictures[0].picture}`} alt="Product Thumbnail" />
                </Image>
            </Link>
            <Details className="products-details">
                <Name className="products__name text-dark">{product.name}</Name>
                <Rate className="product__rate">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </Rate>
                <Price className="products__price">
                    {product.price}
                    <Currency className="products__currency"><BiEuro /></Currency>
                </Price>
                <CTA className="cta">
                    <CartButton itemId={product.id}><BiCart /></CartButton>
                    {/* <Button className="btn btn-buy">Acheter</Button> */}
                    <Button className="btn btn-love">
                        <AiOutlineHeart />
                    </Button>
                </CTA>
            </Details>
        </Cards>
        // ))

    ))

    if (allCategory.length === 0) {
        return (
            <>
                <Section className="articles-section">
                    <Title className="articles-title">Aucun resultat pour votre recherche "{str}" dans la categorie "{category}"</Title>
                </Section>
            </>
        )
    } else {
        return (
            <>
                <Section className="articles-section">
                    <Title className="articles-title">Resultat pour votre recherche "{str}" {category !== null ? `dans la catégorie "${category}"` : `dans "toutes les catégories"`}</Title>
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