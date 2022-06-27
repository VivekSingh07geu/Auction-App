import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import db from '../Firebase';
import {useDispatch, useSelector} from 'react-redux';
import { selectUserEmail } from '../features/user/userSlice';
import Timer from './Timer';

function Bid() {
    const { id } = useParams();
    const [ product , setProduct ] = useState(''); 
    const userEmail = useSelector(selectUserEmail);

    useEffect(() => {
        db.collection("products")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                setProduct(doc.data());
            } else {

            }
        })
    }, [])

    const MaxAmount = product.amount; 
    const [amount , setAmount] = useState('');
    const highestBidder = userEmail;

    function handleSubmit(e) {
        e.preventDefault()
        if(amount === ''){
            alert("Enter Amount")
            return
        }

        if(userEmail === ''){
            alert("Please Login")
            return;
        }

        if(amount <= MaxAmount){
            alert("Your Enter amount is less")
            return;
        }

        db.collection('products')
        .doc(id)
        .update({amount , highestBidder})
        .then(response => {
            console.log(response)
        }).catch(error => console.log(error.message))

        alert("Bidded Succesfully , Refresh Page")


        setAmount({
            amount: "",
        });
    }

    // finding milliseconds

    var date = new Date(product.date);
    var milliseconds = date.getTime();


    let status;

    if(product.biddingStatus === "0")
        status = "Bidding Closed"
    else
        status = "Bidding Open"

    
    return (
        <Container>
            {product && (
                <>
                    <Cover>
                        <Wrap1> 
                            <Image>
                                <img src = {product.img} alt = "" />
                            </Image>
                            <div>
                                <Timer 
                                    countdownTimestampMs = {milliseconds}
                                    id = {id}
                                />
                            </div>
                        </Wrap1>

                        <Wrap2>
                            <p>{product.name}</p>
                            <p>Description</p>
                            <p>{product.amount}</p>
                            <p>Timer</p>
                            <p>Status = {status}</p>
                            <form onSubmit = {handleSubmit}>
                            Enter Bidding Amount
                            <input 
                                id = 'amount'
                                type = 'number'
                                value = {amount}
                                onChange ={e => setAmount(e.target.value)}
                            />
                            <button type = "submit">Bid</button>
                            </form>
                        </Wrap2>
                    </Cover>
                </>
            )}
            
        </Container>
    )
}

export default Bid

const Container = styled.div`
    height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #00c3ff, #ffff1c);

`

const Cover = styled.div`
    display: flex;

`
const Wrap2 = styled.div``
const Wrap1 = styled.div`
    max-width: 100%;
    max-height: 100%;
    align-items: center;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    // position: absolute;
`
const Image = styled.div`
    background: white;
    border-radius: 10px;
    width: 500px;
    height: 350px;
    border: 3px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    padding: 10px;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 100%;
    } 

`
const Summary = styled.div`
    display: flex;
    flex-direction: column;
`
const Price = styled.div`
    background: white;
    border-radius: 10px;
    display: flex;
    width: 420px;
    flex-direction: column;
    border: 2px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    margin: 15px;
    padding: 10px;
    p {
        font-size: 30px;
        margin-top : -10px;
    }

`

const Button = styled.a`
    display: flex;
    justify-content: center;
    background: #fb641b;
    border: none;
    color: #fff;
    width: 100%;
    height: 40px;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;

    &:hover {
        background: #ff9f00;
    }

`
const Heading = styled.div`
    border-bottom : 1.5px solid gray;
    p{
        text-transform: uppercase;
        margin-top : 0;
        margin-bottom: 3px;
        font-weight: 600;
        font-size: 22px;
        letter-spacing: 1.5px;
    }
`
const Specification = styled.div`
    background: white;
    border-radius: 10px;
    overflow: hidden;
    width: 420px;
    height: fit-content;
    border: 3px solid rgba(249 , 249 , 249 , 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
    padding: 10px;
    margin: 15px;
`
const Table = styled.table`
    min-width: 100%;
`
const Tr = styled.tr`
    
    display: flex;
    justify-content: space-between;
`
const Key = styled.td``
const Value = styled.td``