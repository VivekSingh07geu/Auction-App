import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectProducts } from '../features/product/productSlice';
import { selectUserEmail } from '../features/user/userSlice';
function Get_Item() {
    const products = useSelector(selectProducts);
    const userEmail = useSelector(selectUserEmail);

    return (
    <Container>
        <Grid>
            { products &&
                products.map((product)=>(
                    userEmail && product.highestBidder === userEmail ?
                    <Cover key={product.id}>
                        
                            <Wrap>
                                <Detail>
                                    <div>
                                        <Link to = {`/bid/${product.id}`}>
                                            <img  src = {product.img} alt = "" /> 
                                        
                                        </Link>
                                        </div>
                                    <div>
                                        <p>{product.name}</p>
                                    </div>
                                </Detail>
                                <Get>
                                    <button>Get Item</button>
                                </Get>
                            </Wrap>
                        
                    </Cover>
                    : null 
                    // <img src = "./EmptyCart.png" />
                ))
            }
        </Grid>      
    </Container>
  )
}

export default Get_Item

const Container = styled.div`
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 50px;
`

const Grid = styled.div`
` 

const Cover = styled.div`
    
`
const Wrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    height: 230px;
    width: 60%;
    border: 3px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    img {
        cursor: pointer;
        max-width: 100%;
        max-height: 100%;
    } 

    &:hover {
        transform: scale(1.02);
        border-color: rgba(249 , 249 , 249 , 0.8);
    }

    p {
        color: black;
        margin-top: 15px;
        text-align: center;
        text-transform: capitalize;
    }
`

const Detail = styled.div`
    display: flex;
    width: 60%;
    background-color: red;
    justify-content: space-evenly;
    padding: 10px;
`


const Get = styled.div`
`