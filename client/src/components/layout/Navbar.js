import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";
import logo from "../../fridgeLogo.png"
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
              <Link to="/" style={{}} className="navItem btn btn-large waves-effect waves-light hoverable blue accent-3 font-weight-bold">
                <span class="navItem"><img src={logo} alt="Logo" height="22px" style={{padding:0}}/><span style={{fontWeight: 700}}> FRIDGE</span><span style={{fontWeight: 200}}>RECIPES</span></span>
              </Link>
            </li>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                  <li className="nav-item active">
                    <Link to="/register" style={{}} className="navItem btn btn-large waves-effect waves-light hoverable blue accent-3 font-weight-bold">
                      <span class="navItem" style={{}}>REGISTER</span>
                    </Link>
                  </li>
                ):
                (
                  <li className="nav-item active">
                    <Link to="/fridge" style={{}} className="navItem btn btn-large waves-effect waves-light hoverable blue accent-3 font-weight-bold">
                      <span class="navItem">VIEW FRIDGE</span>
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
                    <Link to="/login" style={{}} className="navItem btn btn-large waves-effect  blue accent-3 font-weight-bold">
                      <span class="navItem" style={{}}>LOG IN</span>
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
                <Link to="/" onClick={context.toggleLogout} style={{width: "140px", borderRadius: "3px",}} className="btn btn-large waves-effect waves-light hoverable blue accent-3 font-weight-bold">
                <span class="navItem" style={{}}>LOG OUT &nbsp;</span>
                <i className="material-icons md-18" style={{fontSize:"16px"}}>exit_to_app</i>
                </Link>
                ): null
              }
            }
            </LoginContext.Consumer>
          </div>
        </div>
      </nav>
      // <div className="navbar-fixed">
      //   <nav className="z-depth-0">
      //     <div className="nav-wrapper white">
      //       <Link
      //         to="/"
      //         style={{
      //           fontFamily: "monospace"
      //         }}
      //         className="col s5 brand-logo center black-text"
      //       >
      //       <img src={logo} alt="Logo" height="50px" style={{padding:10}}/>
      //         {/* <i className="material-icons">fridge</i> */}
              
      //       </Link>
      //       <LoginContext.Consumer>
      //       {context => {
      //           return (
      //               <Link to="/login"
      //               onClick={context.toggleLogout}
      //               style={{
      //               width: "140px",
      //               borderRadius: "3px",
      //               letterSpacing: "1.5px"
      //               }}
      //               className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //           >
      //               Logout
      //           </Link>
      //           )
      //       }}
            
      //         </LoginContext.Consumer>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}
export default Navbar;