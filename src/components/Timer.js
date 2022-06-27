import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectProducts } from '../features/product/productSlice'
import db from '../Firebase'
import {getRemainingTimeUntilMsTimestamp} from './CountdownTimeUtils'

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

function Timer({countdownTimestampMs , id}) {

  const [remainingTime , setRemainingTime] = useState(defaultRemainingTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearTimeout(intervalId);
    } , [countdownTimestampMs])

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }


  /// handling bidding status

    const [ product , setProduct ] = useState(''); 

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
        console.log("Chal")
    }, [])

    const state = product.biddingStatus;
    var biddingStatus = state;
    if(remainingTime.days === "00" &&
       remainingTime.hours === "00" &&
       remainingTime.minutes ==="00" &&
       remainingTime.seconds === "00" && biddingStatus === "1"){

        biddingStatus = "0";
        db.collection('products')
        .doc(id)
        .update({biddingStatus})
        .then(response => {
        console.log(response)
        }).catch(error => console.log(error.message))
        
      }

    

  return (
    <Container>
        <span>{remainingTime.days}</span>
        <span>days</span>
        <span>{remainingTime.hours}</span>
        <span>hours</span>
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
    </Container>
  )
}

export default Timer


const Container = styled.div`
    width: 600px;
    height: 100px;
    border: 2px solid black;

    font-family: "Oswald";
    font-size: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    span{
        margin-left: 5px;
        margin-right: 5px;
    }
`