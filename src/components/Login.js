import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { selectUserDetails } from '../features/user/userDetailSlice'

function Login() {

    const userDetails = useSelector(selectUserDetails);

    const [user , setUser] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();

    let name, value;
    const getUserData = (event) => {
      name = event.target.name;
      value = event.target.value;
  
      setUser({...user, [name]: value });
    }

    function handleSubmit(e){
        e.preventDefault();

        const {username , password} = user;

        if(username && password){
            
            {userDetails && 
                userDetails.map((userDetail) => (
                    console.log(userDetails.username)
                )); 
            }
            
        
        }
        else{
            alert("Please fill all the data");
        }    
    }

    return (
        <Container>
            <CTA>
                <Left>
                    <img src = "/login.png" alt = "" />
                </Left>
                <Right>
                    <Wrap>
                        <Title>
                            <h1>Login</h1>
                            <Description>Welcome back! Please login to your account.</Description>
                        </Title>
                        <form onSubmit={handleSubmit}>
                            <Input>
                                <Description>
                                    Username
                                </Description>
                                <input 
                                    type = "text" 
                                    placeholder='username@gmail.com'
                                    name = "username"
                                    value = {user.username}
                                    onChange = {getUserData}
                                    required
                                />
                            </Input>
                            <Input>
                                <Description>
                                    Password
                                </Description>
                                <input 
                                    type = "password" 
                                    placeholder='********'
                                    name = "password"
                                    value = {user.password}
                                    onChange = {getUserData}
                                    required   
                                />
                            </Input>
                            
                            <Log type = 'submit'>Login</Log>
                        </form>
                        <Fpas>
                            <Description>
                                Forget Password?
                            </Description>
                        </Fpas>
                        <NewUser>
                            <Description>New User?</Description>
                            <Link to = {`/signup`}>
                            <SignUp>
                                
                                    <p>SignUp</p>
                            </SignUp>
                            
                            </Link>
                        </NewUser>
                    </Wrap>
                </Right>
            </CTA>
        </Container>
    )
}

export default Login

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
    width: 70%;
    background-color: #0063e5;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 28px;
    border: transparent;

    &:hover {
        background: #0483ee;
    }
`
const Description = styled.p`
    font-size: 13px;
    letter-spacing: 1.4px;
    color: #989898;
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

const Title = styled.div`
    margin-bottom: 40px;
`
const Input = styled.div`
`

const Wrap = styled.div`
width: 80%;
height: 80%;
margin: 80px;  

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