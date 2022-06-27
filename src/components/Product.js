import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectProducts } from '../features/product/productSlice'

function Product() {

    const products = useSelector(selectProducts);

    return (
        <Container>
            <Heading>
                <p>Products For You</p>
            </Heading>
            <Grid>
                { products && 
                    products.map((product)=>(
                        <Cover key={product.id}>
                            <Link to = {`/bid/${product.id}`}>
                                <Wrap>
                                    <img  src = {product.img} alt = "" /> 
                                </Wrap>
                            </Link>
                            <p>{product.name}</p>
                        </Cover>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default Product

const Container = styled.div`
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 50px;
`
const Heading = styled.div`
    margin-top: 5px;
    margin-bottom: 35px;
    margin-right: 608px;
    p{
        margin-left: 600px;
        text-transform: uppercase;
        margin-top : 0;
        margin-bottom: 3px;
        font-weight: 370;
        font-size: 22px;
        letter-spacing: 1.5px;
        border-bottom : 1px solid black;
    }
` 
const Grid = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4 , minmax(0 , 1fr));
` 

const Cover = styled.div`
    p {
        margin-top: 15px;
        text-align: center;
        text-transform: capitalize;
    }
`
const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    height: 200px;
    width: 300px;
    border: 3px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
    display: flex;
    justify-content: center;
    padding: 10px;

    img {
        max-width: 100%;
        max-height: 100%;
    } 

    &:hover {
        transform: scale(1.10);
        border-color: rgba(249 , 249 , 249 , 0.8);
    }
`



