import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext";


class PageNotFound extends Component {
 
render() {
    
    return (
      <div className="container-fluid poppin"  style={{marginTop:"50px",maxWidth:"750px",width:"100%"}}>
        <div className="row">
          <div className="col-sm-12 text-center align-middle">
            ERROR 404: Page Not Found
            <div>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                <Link to="/" onClick={context.toggleLogout} style={{borderRadius: "3px",}} className="btn btn-primary">
                <span>Return Home</span>
                </Link>
                ):
                (
                <Link to="/fridge" onClick={context.toggleLogout} style={{borderRadius: "3px",}} className="btn btn-primary">
                <span>Return to Fridge</span>
                </Link>
                )
              }
            }
            </LoginContext.Consumer>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

PageNotFound.contextType = LoginContext
export default PageNotFound;