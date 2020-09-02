import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext";
import mockup from "../../mockup.png"

// Landing/homepage
class Landing extends Component {
  render() {
    //Redirect if logged in
    if(this.context.loggedIn){
      this.props.history.push("/fridge");
    }
    return (
      <div className="container-fluid poppin" >
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
              <img src={mockup} alt="mockup" style={
                {marginLeft: "auto",
                marginRight: "auto",
                padding:"5vh 5vw 5vh 0px",
                width: "100%",
                }}/>
            </div>
          </div>
        </div>
    );
  }
}

Landing.contextType = LoginContext
export default Landing;