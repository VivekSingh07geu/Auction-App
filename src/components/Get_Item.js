import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectProducts } from '../features/product/productSlice';
import { selectUserEmail } from '../features/user/userSlice';
import db from '../Firebase';
function Get_Item() {
    const products = useSelector(selectProducts);
    const userEmail = useSelector(selectUserEmail);

    function check(date1) {
        var date = new Date(date1);
        const product_date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        
        const current = new Date();
        const current_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        

        if(product_date < current_date)
            return true;
        else
            return false;
    }

    const handleSubmit = (elem) => {
        var status = "sold";
        db.collection('products')
        .doc(elem)
        .update({status})
        .then(response => {
            console.log(response)
        }).catch(error => console.log(error.message))

        alert("Product will be delivered to your address.");
    }

    return (
    <Container>
        <Grid>
            <Title>Your Product Will Display Here</Title>
            <Description>After You Win The Bid</Description>
            { products &&
                products.map((product)=>(
                    userEmail && (product.highestBidder === userEmail) && check(product.date) && product.status === "" ?
                    <Cover key={product.id}>
                        
                            <Wrap>
                                <Detail>
                                    <Img>
                                        <Link to = {`/bid/${product.id}`}>
                                            <img  src = {product.img} alt = "" /> 
                                        
                                        </Link>
                                    </Img>
                                    <Name>
                                        <Name1><span>{product.name}</span></Name1>
                                        <Price>₹<span>{product.amount}</span></Price>
                                    </Name>
                                </Detail>
                                <Get>
                                    <div>
                                        <Log onClick = {() => handleSubmit(product.id)}>Get Product</Log>
                                    </div>   
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
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    &:before{
        background: url("/cart_8.jpg") center center / cover 
        no-repeat fixed;
        content: "";
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0; 
        z-index: -1;
    }
`
const Title = styled.h1`
    width: 34%;
    border-bottom: 1px solid black;
`
const Description = styled.p`
    margin-top: -15px;
`


const Grid = styled.div`

` 

const Cover = styled.div`
    width: 52%;
    
`
const Img = styled.div`
width: 60%;
img {
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
}
`

const Name = styled.div`
width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: left;

`

const Name1 = styled.div`
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 25px;
    font-weight: lighter;
`

const Price = styled.div`
    margin-top: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 35px;
    font-weight: lighter;
    color: #A52A2A;
`

const Log = styled.div`
    width: 100%;
    background-color: #0063e5;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    border: transparent;

    &:hover {
        background: #0483ee;
    }
`


const Wrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    height: 200px;
    width: 85%;
    border: 3px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 1px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    border-color: rgba(249 , 249 , 249 , 0.8);
    margin-top: 50px;
    margin-right: auto;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    padding: 10px;

     

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
    width: 70%;
    justify-content: space-between;
    padding: 10px;
`


const Get = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    jusitfy-content: end;

    div {
        width: 100%;
    }
`