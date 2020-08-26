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
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {LoginContext} from "./components/LoginContext";
import jwt_decode from "jwt-decode";

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
      console.log("Toggling Login")


      this.setState(state => ({
        loggedIn: !state.loggedIn,
        token: token
      }));
    };
     // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      loggedIn:false,
      toggleLogin: this.toggleLogin,
      token:""
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
              <Route path="/" render={()=><p>404 Page not found</p>} />
            </Switch>
            {/* <LoginContext.Consumer>
            {value => <p>{JSON.stringify(value)}</p>}
            </LoginContext.Consumer> */}
          </div>
        </Router>
      </LoginContext.Provider>
    );
  }
}
export default App;