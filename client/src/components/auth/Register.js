import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "../LoginContext"

class Register extends Component {
    constructor() {
        super();
        this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange(e){
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
            };
        console.log(newUser);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        }

        fetch('/api/users/register', requestOptions)
            .then(response => {
            const r = response.json()
                if(response.ok){
                    console.log("Good")
                    this.props.history.push("/login");
                }
                return r
            })
            .then(data => {
                if(this._isMounted){
                    this.setState({ errors: data })
                }
            })
            //.catch(err => this.setState({ errors: err. }))
    };

render() {
    const { errors } = this.state;
    //console.log(JSON.stringify(errors))
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
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
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
                </button>
              </div>
            </form>
            {this.state.errors !=null ? <p>{JSON.stringify(this.errors)}</p> : null}
            {this.state.data !=null ? <p>{JSON.stringify(this.state.data)}</p> : null}
          </div>
        </div>
        <LoginContext.Consumer>
            {value => <p>{JSON.stringify(value)}</p>}
        </LoginContext.Consumer>
      </div>
    );
  }
}
export default Register;