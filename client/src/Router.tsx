import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import Users from "./components/Users/Users";
import History from "./components/History/History";

const Router = () => {
  return (
    <div>
      <title>Haris</title>
      <BrowserRouter>
      <Header/>
        <Route path="/" exact>
          <Homepage/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signUp">
          <SignUp/>
        </Route>
        <Route path="/details/">
          <Details/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/history">
          <History/>
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default Router;
