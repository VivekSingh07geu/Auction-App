import React , { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { selectUserAmount, selectUserEmail, setSignOut} from '../features/user/userSlice';
// import { auth , provider } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';

function Header() { 
    const dispatch = useDispatch();
    // const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const userAmount = useSelector(selectUserAmount);
    const navigate = useNavigate();

    // useEffect(() => {
    //     auth.onAuthStateChanged(async (user) => {
    //         if(user){
    //             dispatch(setUserLogin({
    //                 // name: user.displayName,
    //                 email: user.email
    //                 // photo: user.photoURL
    //             }))
    //             navigate('/');
    //         }
    //     })
    // } ,[])


    // const signIn = () => {
    //     auth.signInWithPopup(provider)
    //     .then((result) => {
    //         let user = result.user
    //         dispatch(setUserLogin({
    //             // name: user.displayName,
    //             email: user.email
    //             // photo: user.photoURL
    //         }))
    //         navigate('/');
    //     })
    // }
    
    // console.log("In Header" , userEmail);
    const signOut = () => {
            dispatch(setSignOut()); 
           navigate("/login");
    }

    console.log("Hello");
    console.log(userEmail);
    return (
        <Nav>
            <Container>
                <Logo>
                    <LOGO_IMG>
                        <img src = "/logo.png" alt = "" />
                    </LOGO_IMG>
                </Logo>
                <Items>
                    <Link to = "/" style={{ textDecoration: 'none' }}>
                        <a> 
                            <span>Home</span> 
                        </a>
                    </Link>
                    <Link to = "/add_item" style={{ textDecoration: 'none' }}>
                        <a> 
                            <span>Add Product For Auction</span> 
                        </a>
                    </Link>
                    <Link to = "/get_item" style={{ textDecoration: 'none' }}>
                        <a> 
                            <span>Get Your Products</span> 
                        </a>
                    </Link>
                    <Link to = "/add_amount" style={{ textDecoration: 'none' }}>
                        <a> 
                            <span>Add Amount</span> 
                        </a>
                    </Link>
                </Items>
            </Container>
            
                { !userEmail ? (
                    <Right>
                        <Link to = "/signup">
                            <Login> sign Up </Login>
                        </Link>
                        <Link to = "/login">
                            <Login> Login </Login>
                        </Link>
                    </Right>
                ) : (
                    <Wrap>
                        <Email>Hello , {userEmail}</Email>
                        <Balance>
                            <Title>
                                <span>Balance:</span>
                            </Title>
                            <IMG>
                                <img src = "/LeetCoin.png" alt = "" />
                            </IMG>
                            <Amount>
                                <span>{userAmount}</span>
                            </Amount>
                        </Balance>
                        <div>
                            <Login onClick = {signOut}> Logout </Login>
                        </div>
                    </Wrap>
                    )
                }
        </Nav>
    )
}

export default Header

const Nav = styled.div`
    height: 70px;
    width: 100%;
    background: black;
    color : white;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
    justify-content: space-between;
`
const Container = styled.div`
    display: flex;
    // background-color: white;
    width: 70%;
`
const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 20%;
    height: 50px;
    position: relative;
`
const LOGO_IMG = styled.div`
    position: absolute;
    img{
        width: 100%;
        height: 100%;
    }
`

const Email = styled.div`
font-size: 13px;
letter-spacing: 1.20px;
display: flex;
align-items: center;
`

const Balance = styled.div`
    align-items: center;
    display: flex;
`
const IMG = styled.div`
    display: flex;
    align-items: center;
    margin-right: 4px;
    img {
        width: 25px;
        height: 25px;
    }
`

const Amount = styled.div`
    display: flex;
    align-itmes: center;
    color: #ffd800;
    span {
        font-weight: bold;
        font-size: 18px;
    }
`

const Title = styled.div`
    margin-right: 10px;
`

const Items = styled.div`
    
    display: flex;
    flex: 1;
    margin-left: 30px;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 18px;
        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.20px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom : -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`
const Right = styled.div`
    display: flex;
    justify-content: space-between;
    width: 14%;
`

const Wrap = styled.div`  
    width: 38%;
    display: flex;
    justify-content: space-between;
`

const UserImg = styled.img`
    width : 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.button`
    width: 100%;
    height: 40px;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0 , 0 , 0 , 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const Add = styled.div`
    
`