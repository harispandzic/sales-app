import React, { useState } from 'react';
import './SignUp.css';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [name, setName] = useState<string>();
    const [lastname, setLastname] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [photo, setPhoto] = useState<string>();

    const handleSignUp = () => {
        const user = { name, lastname, email, password, photo };
        axios.post('http://localhost:3001/signUp', user)
            .then(res =>{
                console.log(res.data)
                toast(<span style={{color: "black"}} >Account successfully created! Now, you can login!</span>);
                setTimeout(function(){ window.location.href ="/login"; }, 1000);
            }
            ).catch((e) => {
                console.log(e.status);
            });
    }
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.value);
    }
    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.target.value);
    }
    return (
        <>
            <div>
                <div className="signUp">
                    <form>
                    <div className="alert">
                            <Alert severity="success">Sign up into App</Alert><br></br>
                        </div>
                        <div className="input">
                            <TextField onChange={handleChangeName} className="input" id="standard-basic" label="Name" /><br></br> 
                        </div>
                        <div className="input">
                            <TextField onChange={handleChangeLastName} className="input" id="standard-basic" label="Lastname" /><br></br> 
                        </div>
                        <div className="input">
                            <TextField onChange={handleChangeEmail} className="input" id="standard-basic" label="E-mail" /><br></br> 
                        </div>
                        <div className="input">
                            <TextField type="password" onChange={handleChangePassword} className="input" id="standard-basic" label="Password" /><br></br> 
                        </div>
                        <div className="input">
                            <TextField  onChange={handleChangePhoto} className="input" id="standard-basic" label="Photo" /><br></br> 
                        </div>
                    </form><br></br>
                    <Button onClick={handleSignUp} variant="contained" color="primary">Sign up</Button><br></br><br></br>
                </div>
            </div>
        </>
    );
}

export default SignUp;