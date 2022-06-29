import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import db from '../Firebase';
import {useDispatch, useSelector} from 'react-redux';
import { selectUserAmount, selectUserEmail, setUserLogin } from '../features/user/userSlice';
import Timer from './Timer';
import { selectUserDetails } from '../features/user/userDetailSlice';

function Bid() {
    const { id } = useParams();
    const [ product , setProduct ] = useState(''); 
    const userEmail = useSelector(selectUserEmail);
    const userDetails = useSelector(selectUserDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    // Date Checking and Updating
        var date = new Date(product.date);

        /* Adding 1 more day to correct display time */
        var temp = new Date(product.date);
        temp.setDate(temp.getDate() + 1)
        
        var milliseconds = temp.getTime();
        const product_date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
        const current = new Date();
        const current_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
        var status;
        if(product.biddingStatus === '1')
            status = "Bidding Open"
        else
            status = "Bidding Closed"
    
        if(product.biddingStatus === "1" && (current_date > product_date)){
            
            const biddingStatus = "0";
            db.collection('products')
            .doc(id)
            .update({biddingStatus})
            .then(response => {
                console.log(response)
            }).catch(error => console.log(error.message))

            db.collection("products")
            .doc(id)
            .get()
            .then((doc)=>{
                if(doc.exists){
                    setProduct(doc.data());
                } else {

                }
            })
            
        }
        else if(product.biddingStatus === "0" && (current_date <= product_date)){
            const biddingStatus = "1";
            db.collection('products')
            .doc(id)
            .update({biddingStatus})
            .then(response => {
                console.log(response)
            }).catch(error => console.log(error.message))

            db.collection("products")
            .doc(id)
            .get()
            .then((doc)=>{
                if(doc.exists){
                    setProduct(doc.data());
                } else {

                }
            })
        }

    const MaxAmount = product.amount; 
    const [money , setMoney] = useState('');
    const highestBidder = userEmail;
    const userAmount = useSelector(selectUserAmount);

    function handleSubmit(e) {
        e.preventDefault()

        if(current_date > product_date){
            alert("Bidding Over.")
            return;
        }

        if(userEmail === ''){
            alert("Please Login")
            return;
        }

        if(money === ''){
            alert("Enter Amount")
            return;
        }

        if(money <= MaxAmount){
            alert("Your Enter amount is less.")
            return;
        }

        if(userAmount <= MaxAmount){
            alert("Not Enough Balance.");
            return;
        }

        var amount = money;

        db.collection('products')
        .doc(id)
        .update({amount , highestBidder})
        .then(response => {
            console.log(response)
        }).catch(error => console.log(error.message))


        amount = Number(userAmount) - Number(money);

        var id1;
        userDetails.map((e) => {
            if(e.username === userEmail){
                id1 = e.id;
            }
        })

        db.collection('users')
          .doc(id1)
          .update({amount})
          .then(response => {
             console.log(response)
          }).catch(error => console.log(error.message))
        
            dispatch(setUserLogin({
            // name: user.displayName,
                email: userEmail,
                amount: amount,
            // photo: user.photoURL
            }))


        setMoney({
            money: "",
        });

        alert("Bidded Succesfully")
        navigate('/')
    }


    
    return (
        <Container>
            {product && (
                <Main>
                    <Cover>
                        <Wrap1> 
                            <Image>
                                <img src = {product.img} alt = "" />
                            </Image>
                            
                        </Wrap1>

                        <Wrap2>
                            <Wrap2Mid>
                                <Name><span>{product.name}</span></Name>
                                <Description>Current Sold Price</Description>
                                <Price><span>₹{product.amount}.00</span></Price>
                                <About>
                                    {product.description}
                                </About>
                                <Price><span>{status}</span></Price>
                                <form onSubmit = {handleSubmit}>
                                    <Input>
                                    <Description>Enter Bidding Amount</Description>
                                    <input 
                                        id = 'money'
                                        type = 'number'
                                        value = {money}
                                        onChange ={e => setMoney(e.target.value)}
                                    />
                                    <Log type = "submit">Bid</Log>
                                    </Input>
                                </form>
                            </Wrap2Mid>
                        </Wrap2>
                    </Cover>
                    <CountDown>
                        <Timer 
                            countdownTimestampMs = {milliseconds}
                            id = {id}
                        />
                    </CountDown>
                </Main>
            )}
            
        </Container>
    )
}

export default Bid

const Container = styled.div`
    height: calc(100vh - 70px);
    display: flex;

    background: #C6FFDD;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


`

const Cover = styled.div`
    display: flex;
    height: 100%;
    height: 73%;
    width: 100%;
`
const Wrap1 = styled.div`
    width: 50%;
    max-height: 100%;
    align-items: center;
    display: flex; 
    flex-direction: column;
    justify-content: center;

    
`
const Wrap2 = styled.div`
width: 50%;
`

const Wrap2Mid = styled.div`
    margin-top: 50px;
    width: 60%;
    // padding: 15px;
    // margin-top: 50px;
    // width: 70%;
    // border: 4px solid grey;
    // border-radius: 15px;
    // background-color: white;
`

const Main = styled.div`
    width: 100%;
`
const CountDown = styled.div`
    display: flex;
    justify-content: center;
    // background-color: white;
    height: 25%;
    margin-top: 10px;
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

const Name = styled.div`
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 25px;
    font-weight: lighter;
    margin-bottom: 2px;
    border-bottom: 1px solid black;
    display: table-cell;
`

const Price = styled.div`
    margin-top: -10px;
    margin-bottom: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 35px;
    font-weight: lighter;
    color: #A52A2A;
`
const About = styled.div`
    margin-bottom: 20px;
    span {
        color:#666666;
        font-family:Georgia,serif;
        font-size:14.5px;
        padding:10px 0;
    }
`


const Input = styled.div`
input {
    width: 300px;
    letter-spacing: 1px;
    font-size: 16px;
    padding: 5px 12px;
    line-height: 20px;
    border-radius: 8px;
    border: 1px solid #696969;
    outline: none;
}
`

const Description = styled.p`
    font-size: 14px;
    letter-spacing: 1.4px;
    color: #989898;
    margin-left:2px;
`

const Log = styled.button`
    width: 70%;
    background-color: #8B0000;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 4.8px;
    margin-top: 18px;
    border: transparent;
    &:hover {
        background: #800000;
    }
`


