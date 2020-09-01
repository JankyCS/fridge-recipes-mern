import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import FridgePage from "./components/layout/FridgePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {LoginContext} from "./components/LoginContext";
import jwt_decode from "jwt-decode";
const dotenv = require('dotenv').config()

const UserContext = React.createContext()

// class Provider extends Component {

//   render() {
//     return (
//       <UserContext.Provider>
//       {this.props.children}
//       </UserContext.Provider>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleLogin = (token) => {
      localStorage.setItem("jwtToken", token);
      console.log("Toggling Login")
      const decoded = jwt_decode(token);

      this.setState(state => ({
        loggedIn: true,
        token: token
      }));
    };

    this.toggleLogout = () => {
      localStorage.removeItem("jwtToken");
      console.log("Logging out")
      //const decoded = jwt_decode(token);

      this.setState(state => ({
        loggedIn: false,
        token: null
      }));
    };
    
    let t = localStorage.jwtToken;
    if(t){
    console.log("rn t is "+t)

    }else
    {
      console.log("no token")
    }
    const tokenData = {
      token: t
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenData)
    }


    //if(decoded.exp*1000)
    if(t!=null){
      console.log("hereee")
      const decoded = jwt_decode(t)

      const expDate = new Date(decoded.exp*1000)
      const now = new Date()
      if(expDate-now<259200000){
        fetch('/api/users/refresh', requestOptions)
        .then(response => {
          const r = response.json()
            if(response.ok){
                console.log("Good")
                //this.props.history.push("/login");
            }
            return r
        })
        .then(data => {
            console.log("Refresh Data is "+JSON.stringify(data))
            if(data.success){
              localStorage.setItem("jwtToken", data.token);
               
            }else{
              localStorage.removeItem("jwtToken");
              
            }
             t = localStorage.jwtToken;
             return t
        })
        .then((t)=>{
          console.log(t)

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
    
    // const now = new Date()
    // if(t&&jwt_decode(t).exp*1000 < now.getTime())
    // {
    //   console.log("expired")
    //   localStorage.removeItem("jwtToken")
    // }
    // else
    // {
    //   console.log("not expired yet")
    // }

    //In backend,
     // State also contains the updater function so it will
    // be passed down into the context provider
    
  }




  render() {
    // console.log("Currently stored exp date is ")
    //  var created = ""
    // var expires = ""
    // var t = ""


    // if(this.state.token){
    //   created = new Date(jwt_decode(this.state.token).iat*1000)
    //   expires = new Date(jwt_decode(this.state.token).exp*1000)
    //   t = localStorage.jwtToken
    // }

   
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
              <Route path="/" render={()=><p>404 Page not found</p>} />
            </Switch>
            {/* <LoginContext.Consumer>
            {value => {
              
              return (
                <div>
                <p>{JSON.stringify(t)}</p>
                <p>Created:{created.toString()}</p>
                <p>Expire:{expires.toString()}</p>
                </div>
              )}
            }
            </LoginContext.Consumer> */}
          </div>
        </Router>
      </LoginContext.Provider>
    );
  }
}
export default App;