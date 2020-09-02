import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";
import mockup from "../../mockup.png"

class Landing extends Component {
  render() {
    if(this.context.loggedIn){
      this.props.history.push("/fridge");
    }
    return (
    //<Router>
      <div className="container-fluid landing" >
        <div className="row align-items-center" style={{textAlign:"center",height:300,verticalAlign: "middle"}}>
            <div className="col-sm-5" style={{textAlign:"Left",padding:"10vh 5vw 0px 5vw"}}>
              <h1 style={{fontSize:50,fontWeight:700}}>Your Modern Day Fridge Management Assistant.</h1>
              <p>FRIDGE RECIPES is your modern day recipe-management tool.
                Find inspiration in the kitchen using what is already in your fridge.
                <br/>
                <br/>
                Start saving money and minimizing food waste today.
              </p>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  marginRight:40
                }}
                className="btn btn-raised btn-primary"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                 
                }}
                className="btn btn-raised btn-secondary"
              >
                Log In
              </Link>

            </div>
            <div className="col-sm-7 align-middle">
              <img src={mockup} alt="mockup" height="" style={
                {marginLeft: "auto",
                marginRight: "auto",
                padding:"5vh 5vw 5vh 0px",
                width: "100%",
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
                }}/>
            </div>
          </div>
          
        </div>
    
      //</Router>
    );
  }
}


Landing.contextType = LoginContext
export default Landing;