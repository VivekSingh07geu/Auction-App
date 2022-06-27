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
  })

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({...user, [name]: value });
  }

  function handleSubmit(e){
    e.preventDefault();

    const {name,email,img,amount,date} = user;
    
    if(name && email && img && amount && date){
        db.collection("products")
        .add({
            name , email , img , amount ,date,
        })
        .then(() => {
            alert("Item Added")
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
      });
    }
    else{
      alert("Please fill all the data");
    }
}

  return (
        <Container>
            <Wrap>
              <Wrapper>
                <Heading>Add Item Details</Heading>
                <Details className="constact100-form" onSubmit={handleSubmit}>
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
                          type="text"
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
                    </Right>
                    
                    <Button type = 'submit'>Submit</Button>
                    </Details>
                    
              </Wrapper>
            </Wrap>
        </Container>
  )
}

export default Add_Item

const Container = styled.div`
min-height: calc(100vh - 70px);
`

const Wrap = styled.div`
top: 60px;
left: 150px;
min-height: calc(100vh - 210px);
margin-right: 300px;
margin-bottom: 200px;
position: relative;

border-radius: 20px;
overflow: hidden;
border: 3px solid rgba(249 , 249 , 249 , 100);
box-shadow: rgb(10 0 0 / 69%) 0px 100px 220px 90px,
rgb(0 0 0 / 73%) 0px 0px 0px 0px;
transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;

`
const Wrapper = styled.div`
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;

  min-height: calc(100vh - 320px);
  // background-color: blue; 
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  `
const Heading = styled.div`
font-size: 32px;
letter-spacing: 6px;
padding-left: 30px;
`
const Details = styled.form`
display: flex;
margin-right: 100px; 
justify-content: space-between;
margin-bottom: 30px;
`
const Left = styled.div`
width: 400px; 
`
const Right= styled.div`
width: 400px;
`

const Label = styled.span`
margin-left: 5px;
color: black;
letter-spacing: 1px;
font-size: 14px;
`
const Field = styled.div`
top:0;
left: 0;
font-size: 16px;
margin: 25px;
display: flex;
flex-direction: column;

input{
  border-color: transparent; 
  border-bottom: 1px solid black;
  width: 300px;
  letter-spacing: 1px;
  font-size: 18px;
}
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

