import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext";
import logo from "../../fridgeLogo.png"

//Navbar that conditionally renders certain buttons based on whether or not user logged in
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="navItem btn">
                <span className="navItem"><img src={logo} alt="Logo" height="22px" style={{padding:0}}/><span style={{fontWeight: 700}}> FRIDGE</span><span style={{fontWeight: 200}}>RECIPES</span></span>
              </Link>
            </li>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                  <li className="nav-item active">
                    <Link to="/register" className="navItem btn">
                      <span className="navItem">REGISTER</span>
                    </Link>
                  </li>
                ):
                (
                  <li className="nav-item active">
                    <Link to="/fridge" className="navItem btn">
                      <span className="navItem">VIEW FRIDGE</span>
                    </Link>
                  </li>
                )
              }
            }
            </LoginContext.Consumer>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                 <li className="nav-item">
                    <Link to="/login" className="navItem btn">
                      <span className="navItem">LOG IN</span>
                    </Link>
                  </li>
                ): null
              }
            }
            </LoginContext.Consumer>
          </ul>
          <div className="form-inline my-2 my-lg-0">
           <LoginContext.Consumer>
            {
              context => {
                return context.loggedIn? (
                <Link to="/" onClick={context.toggleLogout} style={{width: "140px", borderRadius: "3px",}} className="btn">
                <span className="navItem">LOG OUT &nbsp;</span>
                <i className="material-icons md-18" style={{fontSize:"16px"}}>exit_to_app</i>
                </Link>
                ): null
              }
            }
            </LoginContext.Consumer>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;