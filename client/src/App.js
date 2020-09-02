import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import FridgePage from "./components/layout/FridgePage";
import PageNotFound from "./components/layout/PageNotFound";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {LoginContext} from "./components/LoginContext";
import jwt_decode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    
    //Context methods to log in and out, saving/removing from localstorage
    this.toggleLogin = (token) => {
      localStorage.setItem("jwtToken", token);
      this.setState(state => ({
        loggedIn: true,
        token: token
      }));
    };

    this.toggleLogout = () => {
      localStorage.removeItem("jwtToken");
      this.setState(state => ({
        loggedIn: false,
        token: null
      }));
    };
    
    let t = localStorage.jwtToken;
    const tokenData = {
      token: t
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenData)
    }

    if(t!=null){
      const decoded = jwt_decode(t)
      const expDate = new Date(decoded.exp*1000)
      const now = new Date()

      //If token expires in less than 3 days, request a new token
      if(expDate-now<259200000){
        fetch('/api/users/refresh', requestOptions)
        .then(response => {
          const r = response.json()
          return r
        })
        .then(data => {
          if(data.success){
            localStorage.setItem("jwtToken", data.token);
              
          }
          else{
            localStorage.removeItem("jwtToken");
          }
          t = localStorage.jwtToken;
          return t
        })
        .then((t)=>{
          if(this.state && this._ismounted){
            this.setState(state => ({
              loggedIn:localStorage.jwtToken ? true : false,
              token: t
            }));
          }
          else{
            this.state = {
              loggedIn:localStorage.jwtToken ? true : false,
              toggleLogin: this.toggleLogin,
              toggleLogout: this.toggleLogout,
              token: t
            }
          }
        })
      }
      
    }
    this.state = {
      loggedIn:localStorage.jwtToken ? true : false,
      toggleLogin: this.toggleLogin,
      toggleLogout: this.toggleLogout,
      token: t
    }  
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/fridge" component={FridgePage} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </LoginContext.Provider>
    );
  }
}

export default App;