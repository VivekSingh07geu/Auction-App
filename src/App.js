import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Bid from './components/Bid';
import Add_Item from './components/Add_Item';
import Login from './components/Login';
import Get_Item from './components/Get_Item';
import SignUp from './components/SignUp';
import Add_Amount from './components/Add_Amount';
import { useDispatch } from 'react-redux';
import db from './Firebase';
import { setProducts } from './features/product/productSlice';
import { setUserDetails } from './features/user/userDetailSlice';
import { setUserLogin } from './features/user/userSlice';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        db.collection("products").onSnapshot((snapshot)=>{
            let tempProducts = snapshot.docs.map((doc)=>{
                return { id: doc.id , ...doc.data() }
            })

            console.log(tempProducts);
            dispatch(setProducts(tempProducts));
        })

        dispatch(setUserLogin({
          // name: user.displayName,
          email: localStorage.getItem("username"),
          amount: localStorage.getItem("amount"),
          // photo: user.photoURL
      }))

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
    <div className='App'>
      <Router>
        <Header/>

          <Routes>
            <Route exact path = "/add_amount" element = {<Add_Amount/>}/>
            <Route exact path = "/login" element = {<Login/>}/>
            <Route exact path = "/add_item" element = {<Add_Item/>}/>
            <Route exact path = "/get_item" element = {<Get_Item/>}/>
            <Route exact path = "/bid/:id" element = {<Bid />} />
            <Route exact path = "/signup" element = {<SignUp />} />
            <Route exact path = "/" element = {<Home />}/>

          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
