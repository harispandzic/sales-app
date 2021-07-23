import React, { useState } from 'react';
import axios from 'axios';
import Login from '../Login/Login';
import { UPDATE_NAME } from '../../actions';
import Products from '../Products/Products';

import './Homepage.css';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const Homepage = () => {

    const selector = useSelector((state :any)=> state.reducer.fullName);
    const routerHistory = useHistory();
    //const[num, setNum] = useState(1);
    // const updateName = () =>{
    //     const name = `Ime ${num}`;
    //     dispatch({
    //         type: UPDATE_NAME,
    //         payload:{
    //             fullName: name
    //         }
    //     });
    //     setNum(num +1);
    // }
    //console.log(selector);
   
    const isLogged = () =>{
        selector !== "" ? routerHistory.push('/') : routerHistory.push('/login')
    }

    //isLogged();

    return (
        <>
        <Products/>
        {/* <p>{selector.fullName}</p>
        <button onClick={updateName}>Update name</button> */}
        </>
    );
}

export default Homepage;