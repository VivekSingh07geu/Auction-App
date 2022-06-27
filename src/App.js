import React from 'react';
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

function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>

          <Routes>
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
