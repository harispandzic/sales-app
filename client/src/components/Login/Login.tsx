import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import {useSelector, useDispatch } from 'react-redux';
import { UPDATE_LOGGED_USER } from '../../actions';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const selector = useSelector((state :any)=> state.reducer.loggedUserID);
    const dispatch = useDispatch();
    const routerHistory = useHistory();

    const handleLogin = () => {
        const user = { email, password };
        axios.post('http://localhost:3001/login', user)
            .then(res => {
                console.log("PHOTO " ,res.data.photo);
                dispatch({
                    type: UPDATE_LOGGED_USER,
                    payload:{
                        loggedUser: res.data.name,
                        loggedUserID:res.data.id,
                        photo:res.data.photo
                    }
                });
                toast(<span style={{color: "black"}} >Welcome to Sales App!</span>);
                //console.log(selector.loggedUser);
                setTimeout(function(){ routerHistory.push('/'); }, 1000);
                // window.localStorage.clear();
                // window.localStorage.setItem("loggedUser",selector.loggedUser );
                //window.location.href = "/";
                
            })
            .catch((e) => {
                toast.error("Mail or password is incorect! Try again!");
            });
    }
    console.log("SELECTOR",selector.loggedUserID);
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <>
        <ToastContainer position="bottom-right" />
            <div>
                <div className="signIn">
                    <form>
                        <div className="alert">
                            <Alert severity="success">Log into App</Alert><br></br>
                        </div>
                        <div className="input">
                            <TextField onChange={handleChangeEmail} className="input" id="standard-basic" label="E-mail" /><br></br> 
                        </div>
                        <div className="input">
                            <TextField type="password" onChange={handleChangePassword} className="input" id="standard-basic" label="Password" /><br></br> 
                        </div>
                    </form><br></br>
                    {/* <a href="/signUp">Sign up</a> */}
                    <Button onClick={handleLogin} variant="contained" color="primary">Log in</Button><br></br><br></br>
                    <span>Don't have an account? </span><a href="/signUp" className="aSignUp">Sign up!</a>
                </div>
            </div>
        </>
    );
}

export default Login;