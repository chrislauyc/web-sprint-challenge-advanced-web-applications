import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import { axiosWithAuth } from "./helpers/axiosWithAuth";

function App() {
  const handleLogOut = ()=>{
    axiosWithAuth().post("/logout",{})
    .then(()=>{
      window.location.href = "/";
    })
    .catch((err)=>{
      console.log({err});
    })
  };
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" onClick={handleLogOut}>logout</a>
        </header> 
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/bubblepage" component={BubblePage}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.