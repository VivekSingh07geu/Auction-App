import React, { useState } from 'react'
import styled from "styled-components";
import db from '../Firebase'
// import { collection , setDoc } from 'firebase/firestore'

function Add_Item() {

  const [user , setUser] = useState({
    name: "",
    email: "",
    img: "",
    amount: "",
    date: "",
    description: "",
  })

  const biddingStatus = "1";
  const highestBidder= "";
  const status= "";

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({...user, [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    const {name,email,img,amount,date,description} = user;
    
    if(name && email && img && amount && date && description){
        db.collection("products")
        .add({
            name, 
            email, 
            img, 
            amount,
            date, 
            description,
            biddingStatus,
            highestBidder,
            status,
        })
        .then(() => {
            alert("Product Added")
        })
        .catch((error) => {
            alert(error.message);
        })

      setUser({
        name: "",
        email: "",
        img: "",
        amount: "",
        date: "",
        description: "",
      });
    }
    else{
      alert("Please fill all the data");
    }
}

  return (
        <Container>
            <Wrap>
              <Wrapper1>
                <img src = "/add-item.jpg" alt = "" />
              </Wrapper1>
              <Wrapper>
                <Heading>Add Product Details</Heading>
                <Details onSubmit={handleSubmit}>
                    <Box>
                      <Left>
                        <Field>
                          <Label>Product Name</Label>
                          <input 
                            className="input100"
                            type="text"
                            name="name"
                            placeholder="Enter Product Name"
                            value = {user.name}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>
                        
                        <Field>
                          <Label>Email</Label>
                          <input 
                            className="input100"
                            type="text"
                            name="email"
                            placeholder="Enter Your Email"
                            value = {user.email}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>

                        <Field>
                          <Label>Image</Label>
                          <input 
                            className="input100"
                            type="text"
                            name="img"
                            placeholder="Enter Image URL"
                            value = {user.img}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>

                        
                      </Left>
                      <Right>
                        <Field>
                          <Label>Amount</Label>
                          <input 
                            className="input100"
                            type="number"
                            name="amount"
                            placeholder="Enter Minimum Biding Amount"
                            value = {user.amount}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>  

                        <Field>
                          <Label>Last Date</Label>
                          <input 
                            className="input100"
                            type="text"
                            placeholder='mm-dd-yyyy'
                            name="date"
                            value = {user.date}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>

                        <Field>
                          <Label>Description</Label>
                          <textarea 
                            rows="5" 
                            cols="4"
                            type="text"
                            placeholder='Add Description ....'
                            name="description"
                            value = {user.description}
                            onChange={getUserData}
                            autoComplete="off"
                            required
                          />
                          {/* <Label className="focus-input100"></Label> */}
                        </Field>
                      </Right>
                    </Box>
                      <Add>
                        <Button type = 'submit'>Submit</Button>
                      </Add>
                    </Details>
              </Wrapper>
            </Wrap>
        </Container>
  )
}

export default Add_Item

const Container = styled.div`
min-height: calc(100vh - 70px);

display: flex;
justify-content: center;
align-items: center;

background: #A1FFCE;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #FAFFD1, #A1FFCE);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #FAFFD1, #A1FFCE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`

const Wrap = styled.div`
background-color: white;
top: 60px;
left: 150px;
height: calc(100vh - 195px);
width: 65%;
border-radius: 25px;
overflow: hidden;
box-shadow: rgb(10 0 0 / 69%) 0px 100px 220px 90px,
rgb(0 0 0 / 73%) 0px 0px 0px 0px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
display: flex;
`
const Wrapper1 = styled.div`
width: 20%;

    img {
        border-bottom-left-radius: 25px;
        border-top-left-radius: 25px;
        height: 100%;
        display: block;
    }
`

const Wrapper = styled.div`
    width: 74%;
    margin-left: 70px;
    margin-right: 50px;

  min-height: calc(100vh - 320px); 
  
  `
const Heading = styled.div`
font-size: 35px;
font-weight: lighter;
border-bottom: 1px solid black;
letter-spacing: 3px;
margin-left: 170px;
margin-right: 220px;
margin-top: 40px;
margin-bottom: 20px;
`
const Details = styled.form`
margin-bottom: 30px;
height:70%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Box = styled.div`
display: flex;
justify-content: space-between;
`
const Left = styled.div`
width: 400px; 
`
const Right= styled.div`
width: 400px;
`

const Label = styled.span`
margin-left: 3px;
margin-bottom: 3px;
font-size: 13px;
font-weight: 500;
letter-spacing: 1px;
`
const Field = styled.div`
top:0;
left: 0;
font-size: 16px;
margin: 25px;
display: flex;
flex-direction: column;

input{
  width: 300px;
    letter-spacing: 1px;
    font-size: 16px;
    padding: 5px 12px;
    line-height: 20px;
    border-radius: 6px;
    border: 3px solid #EEEDE7;
    outline: none;

  // border-color: transparent; 
  // border-bottom: 1px solid black;
  // width: 300px;
  // letter-spacing: 1px;
  // font-size: 18px;
}
  textarea{
    width: 300px;
    letter-spacing: 1px;
    font-size: 16px;
    padding: 5px 12px;
    line-height: 20px;
    border-radius: 6px;
    border: 3px solid #EEEDE7;
    outline: none;
    resize: none;
  }

`
const Add = styled.div`
  display: flex;
  justify-content: end;

  padding-right: 40px;

`
const Button = styled.button`
margin-left: 25px;
border: 1px solid #f9f9f9;
width: 100px;
padding: 8px 16px;
border-radius: 30px;
letter-spacing: 1.5px;
text-transform: uppercase;
transition: all 0.2s ease 0s;
cursor: pointer;
background-color: #f9f9f9;
color: black;
background-color: red;
    color: white;
box-shadow: rgb(255 0 0 / 69%) 0px 0px 20px 5px,
    rgb(0 0 0 / 73%) 0px 0px 0px 0px;
    border-color: transparent;
&:hover {
    background-color: #f9f9f9;
    color: black;
}
`

