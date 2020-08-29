import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";

class Landing extends Component {
  render() {
    return (
    //<Router>
      <div className="container-fluid" >
        <div className="row" style={{textAlign:"center"}}>
          <div className="col-sm-12">
            <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch
            </h4>
            <p>
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
          </div>
        </div>
            <br />
        <div className="row align-items-center" style={{textAlign:"center",height:300,verticalAlign: "middle"}}>
            <div className="col-sm-6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-raised btn-primary"
              >
                Register
              </Link>
            </div>
            <div className="col-sm-6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-raised btn-secondary"
              >
                Log In
              </Link>
            </div>
          </div>
          
        </div>
    
      //</Router>
    );
  }
}
export default Landing;