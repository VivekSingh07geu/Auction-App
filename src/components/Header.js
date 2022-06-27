import React , { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from '../features/user/userSlice';
import { auth , provider } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';

function Header() { 
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                navigate('/');
            }
        })
    } ,[])


    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            navigate('/');
        })
    }
    
    const signOut = () => {
        auth.signOut()
            .then(()=> {
               dispatch(setSignOut()); 
               navigate("/login");
        })
    }
    return (
        <Nav>
            <Container>
                <Logo>AUCTION</Logo>
                <Items>
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
                </Items>
            </Container>
            <Right>
                { !userName ? (
                    <>
                        <Login onClick={signIn}> Login </Login>
                        <Link to = "/login">
                            <Login> Login </Login>
                        </Link>
                    </>
                ) : 
                    <UserImg onClick = {signOut} src = {userPhoto}/>
                }
            </Right>
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
`
const Logo = styled.div`
    width: 100px;
    font-size: 30px;
`
const Items = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
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

`

const UserImg = styled.img`
    width : 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0 , 0 , 0 , 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const Add = styled.div`
    
`

// const NavMenu = styled.div`
//     display: flex;
//     flex: 1;
//     margin-left: 25px;
//     align-items: center;

//     a {
//         display: flex;
//         align-items: center;
//         padding: 0 12px;
//         cursor: pointer;

//         img {
//             height: 20px;
//         }
//         span {
//             font-size: 13px;
//             letter-spacing: 1.42px;
//             position: relative;

//             &:after {
//                 content: "";
//                 height: 2px;
//                 background: white;
//                 position: absolute;
//                 left: 0;
//                 right: 0;
//                 bottom : -6px;
//                 opacity: 0;
//                 transform-origin: left center;
//                 transition: all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.94) 0s;
//                 transform: scaleX(0);
//             }
//         }

//         &:hover {
//             span:after{
//                 transform: scaleX(1);
//                 opacity: 1;
//             }
//         }
//     }
// `
// const UserImg = styled.img`
//     width : 48px;
//     height: 48px;
//     border-radius: 50%;
//     cursor: pointer;
// `


// const LoginContainer = styled.div`
//     flex: 1;
//     display: flex;
//     justify-content: flex-end;
// `