import React from 'react';
import '../Header/Header.css'
import { useSelector } from 'react-redux';
import {useEffect} from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';
import axios from 'axios';
import { LaptopWindows } from '@material-ui/icons';

const Header = () => {
    const routerHistory = useHistory();
    const selector = useSelector((state: any) => state.reducer.loggedUser);
    const selector1 = useSelector((state: any) => state.reducer.loggedUserID);
    const selector2 = useSelector((state: any) => state.reducer.photo);
    console.log("REDUCER PHOTO: ", selector2.photo);

    const handleLogOut = () => {
        toast(<span style={{color: "black"}} >Thank you for visiting. See you again!</span>);
                //console.log(selector.loggedUser);
        setTimeout(function(){ window.location.href = "/login"; }, 1000);
        
    }

    const handleUsers = () =>{
        routerHistory.push("/users");
    }
    
    const handleProducts = () =>{
        routerHistory.push("/");
    }

    const handleHistory = () =>{
        window.localStorage.setItem("loggedID", selector1.loggedUserID);
        routerHistory.push("/history");
    }

    useEffect(() => {
        document.title = "Sales App";
      });
    console.log(selector);
    console.log(window.location.href);
    return (
        <>
        <ToastContainer position="bottom-right" />
            <header className="Header">
                <div className="Name">
                    <img className="logoApp" src="https://i.ibb.co/R70wkhn/favicon.png"/>
                    {selector.loggedUser ? <p>Welcome, {selector.loggedUser + "!"}</p> : <p>SALES APP</p>}
                    {selector.loggedUser ? <a className="usersHref" onClick={handleUsers}>USERS</a> : <p></p>}
                    {selector.loggedUser ? <a className="productsHref" onClick={handleProducts}>PRODUCTS</a> : <p></p>}
                    {selector.loggedUser ? <a className="productsHref" onClick={handleHistory}>HISTORY</a> : <p></p>}
                        <div className="headerItems">
                        {/* <a style={{marginRight: "20px"}}>HOME</a>
                        <a onClick={() => (routerHistory("/"))}>USERS</a> */}
                        </div>
                </div>
                <div>
                    {selector.loggedUser ?
                        <div>
                            <div style={{display: "flex", alignItems:"center"}}>
                            <img className="avatarUser" src={selector2.photo}/>
                            {/* <ExitToAppIcon/> */}
                                <a className="Login" onClick={handleLogOut}>LOGOUT</a>

                                </div>
                        </div>
                        : null}
                    {selector.loggedUser ? <a></a> : (window.location.href === "http://localhost:3000/signUp") ? 
                    <a className="Login" href="/login">LOGIN</a> : 
                    <a className="Login" href="/signUp">SIGN UP</a>}
                </div>
            </header>
        </>
    );
}

export default Header;