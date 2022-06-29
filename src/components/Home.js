import React, { useEffect } from 'react'
import styled from 'styled-components'
import db from '../Firebase'
import { setProducts } from '../features/product/productSlice';
import { useDispatch } from 'react-redux';
import Product from './Product';
import { setUserDetails } from '../features/user/userDetailSlice';

function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        db.collection("products").onSnapshot((snapshot)=>{
            let tempProducts = snapshot.docs.map((doc)=>{
                return { id: doc.id , ...doc.data() }
            })

            console.log(tempProducts);
            dispatch(setProducts(tempProducts));
        })
    }, [])

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot)=>{
            let tempUserDetails = snapshot.docs.map((doc)=>{
                return { id: doc.id , ...doc.data() }
            })

            console.log(tempUserDetails);
            dispatch(setUserDetails(tempUserDetails));
        })
    }, [])

    return (
        <Container>
            <IMG>
                <img src ="/banner2.jpg" alt = ""/>
            </IMG>
            <Product />
        </Container>
    )
}

export default Home

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    overflow-x: hidden;
    
`

const IMG = styled.div`
    img {
        width: 100%;
        height: 100%;
        margin-top: -65px;
        padding: 30px;
    }
    
    margin: 20px;
    display: flex;
`

