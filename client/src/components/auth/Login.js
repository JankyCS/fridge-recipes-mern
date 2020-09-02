import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext";


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
onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit(e) {
    const {toggleLogin} = this.context;
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }

    fetch('/api/users/login', requestOptions)
        .then(response => {
        const r = response.json()
            if(response.ok){
                console.log("Good")
                //this.props.history.push("/login");
            }
            return r
        })
        .then(data => {
            if(true){
                console.log("Data is "+JSON.stringify(data))
                this.setState({ errors: data })
                if(data.success==true){
                    console.log("Signed in")
                    toggleLogin(data.token)
                     this.props.history.push("/fridge");
                }
            }
        })

  };
render() {
  if(this.context.loggedIn){
    this.props.history.push("/fridge");
  }
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
            <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                  {errors.password}
                  {errors.passwordincorrect}
            </span>
          </div>
        </div>
        
      </div>
    );
  }
}

Login.contextType = LoginContext
export default Login;