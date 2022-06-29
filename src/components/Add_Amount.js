import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { selectUserDetails } from '../features/user/userDetailSlice';
import { selectUserAmount, selectUserEmail, setUserLogin } from '../features/user/userSlice';
import db from '../Firebase';

function Add_Amount() {
    const dispatch = useDispatch();
    const userEmail = useSelector(selectUserEmail);
    const userAmount = useSelector(selectUserAmount);
    const userDetails = useSelector(selectUserDetails);
    const navigate = useNavigate();

    const [money , setMoney] = useState('');

    var amount = Number(money) + Number(userAmount);

    function handleSubmit(e){
      e.preventDefault();

      if(userEmail === ''){
        alert("Please Login.");
        return;
      }

      if(money === ''){
        alert("Enter Amount.");
        return;
      }
      var id;
      userDetails.map((e) => {
        if(e.username === userEmail){
            id = e.id;
        }
      })

      db.collection('users')
        .doc(id)
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

        alert("Amount Added Succesfully")
        navigate('/')
    }

  return (
    <Container>
            <CTA>
                <Left>
                    <img src = "/e_wallet.png" alt = "" />
                </Left>
                <Right>
                    <Wrap>
                        <Title>
                            <h1>My wallet</h1>
                            <Description>Balance</Description>
                            <Amount><span>₹{userAmount ? {userAmount} : 0}.00</span></Amount>
                        </Title>
                        <Form onSubmit = {handleSubmit}>
                            <Input>
                                <Name>
                                    Amount
                                </Name>
                                <input 
                                    type = "text" 
                                    placeholder='Enter Amount'
                                    value = {money}
                                    name = "money"
                                    // value = {user.username}
                                    onChange = {e => setMoney(e.target.value)}
                                    required
                                />
                            </Input>
                            <Input>
                                <Name>
                                    Card Number
                                </Name>
                                <input 
                                    type = "text" 
                                    placeholder='Enter Card Number'
                                    // name = "amount"
                                    // value = {user.username}
                                    // onChange = {getUserData}
                                    required
                                />
                            </Input>
                            <Info>
                              <Input1>
                                  <input 
                                      type = "text" 
                                      placeholder='expiry'
                                      // name = "amount"
                                      // value = {user.username}
                                      // onChange = {getUserData}
                                      required
                                  />
                              </Input1>
                              <Input1>
                                  <input 
                                      type = "text" 
                                      placeholder='cvv'
                                      // name = "amount"
                                      // value = {user.username}
                                      // onChange = {getUserData}
                                      required
                                  />
                              </Input1>
                            </Info>
                            
                            <Log type = 'submit'>Add Amount</Log>
                        </Form>
                    </Wrap>
                </Right>
            </CTA>
        </Container>
  )
}

export default Add_Amount

const Container = styled.div`
    background-color: #C0C0C0;
    position: relative;
    height: calc(100vh - 70px);
    display: flex;
    align-items: top;
    justify-content: center;
    

    &:before {
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        content: "";
        top: 0;
        bottom: 0;
        right: 0;
        left: 0; 
        z-index: -1;
    }
`
const CTA = styled.div`
    width: 65%;
    height: 80%;
    display: flex;
    margin-top: 60px;
    border-radius: 25px;
    background-color: white;
`

const Log = styled.button`
    width: 90%;
    
    background-color: #0000ff;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 28px;
    border: transparent;

    &:hover {
        background: #0063e5;
    }
`
const Description = styled.p`
    font-size: 15px;
    letter-spacing: 1.4px;
    color: #989898;
    display: flex;
    justify-content: center;
    width: 90%;
`
const Amount = styled.div`
display: flex;
justify-content: center;
margin-top: -10px;
margin-bottom: -55px;
width: 90%;
span{
  font-size: 35px;
  letter-spacing: 1.05px;
}
`
const Name = styled.div`
  font-size: 13px;
  letter-spacing: 1.4px;
  color: #989898;
  margin-left: 3px;
  margin-bottom: 5px;
  margin-top: 10px;
`

const Left = styled.div`
    width: 50%;

    img {
        border-bottom-left-radius: 25px;
        border-top-left-radius: 25px;
        max-height: 100%;
        display: block;
    }
`

const Right = styled.div`

width: 60%;
justify-content: center;
`

const Form = styled.form`
    padding: 25px;
`

const Info = styled.div`
    display: flex;
    justify-content: space-between;
`

const Title = styled.div`
    margin-bottom: 40px;
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

const Input1 = styled.div`
    
    margin-top: 20px;
    width: 80%;
    input {
      width: 128px;
      letter-spacing: 1px;
      font-size: 16px;
      padding: 5px 12px;
      line-height: 20px;
      border-radius: 8px;
      border: 1px solid #696969;
      outline: none;
  }
`

const Wrap = styled.div`
width: 70%;
height: 80%;
margin-top:50px;
margin-left: 80px; 


`

const Fpas = styled.div`
    
width: 70%;
    display: flex;
    justify-content: end;
`

const NewUser = styled.div `
    width: 30%;
    display: flex;
    justify-content: space-between;
`

const SignUp = styled.div`
font-size: 13px;
letter-spacing: 1.4px;
color: black;

`