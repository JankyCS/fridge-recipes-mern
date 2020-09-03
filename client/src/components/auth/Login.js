import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext";

// User Login Page
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  
  // Form Change Handler
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  // Submit login info, try to log in
  onSubmit(e) {
    const {toggleLogin} = this.context;
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }

    // Request token for corresponding user account from backend
    fetch('/api/users/login', requestOptions)
        .then(response => {
          const r = response.json()
          return r
        })
        .then(data => {
          this.setState({ errors: data })
          if(data.success===true){
              toggleLogin(data.token)
                this.props.history.push("/fridge");
          }
        })

  };

  render() {
    if(this.context.loggedIn){
      this.props.history.push("/fridge");
    }
    const { errors } = this.state;
    return (
      <div className="container-fluid poppin"  style={{marginTop:"50px",maxWidth:"750px",width:"100%"}}>
        <div className="row">
          <div className="col-sm-12">
            <div>
              <h4>
                <b>Log In</b>
              </h4>
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="email">Email</label>
                <input className="form-control"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input className="form-control"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
              </div>
                <button
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Log In
                </button>
              
            </form>

            {/* Errors */}
            <small className="form-text text-danger">
                  {errors.email}
                  <br/>
                  {errors.emailnotfound}
                  <br/>
                  {errors.password}
                  <br/>
                  {errors.passwordincorrect}
            </small>
          </div>
        </div>
        
      </div>
    );
  }
}

Login.contextType = LoginContext
export default Login;