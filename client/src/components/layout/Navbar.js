import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
            <LoginContext.Consumer>
            {context => {
                return (
                    <button
                    onClick={context.toggleLogout}
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Logout
                </button>
                )
            }}
            
              </LoginContext.Consumer>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;