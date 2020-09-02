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
  if(this.context.loggedIn){
    this.props.history.push("/fridge");
  }
    const { errors } = this.state;
    //console.log(JSON.stringify(errors))
    return (
      // padding:"10vh 30vw"
      <div className="container-fluid poppin" style={{marginTop:"50px",maxWidth:"750px",width:"100%"}}>
        <div className="row">
          <div className="col-sm-12">
           
            <div>
              <h4>
                <b>Register</b>
              </h4>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="name">Name</label>
                <input className="form-control"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                
                <small className="form-text text-danger">{errors.name}</small>
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input className="form-control"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <small className="form-text text-danger">{errors.email}</small>
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
                <small className="form-text text-danger">{errors.password}</small>
              </div>
              <div className="form-group">
                <label for="password2">Confirm Password</label>
                <input className="form-control"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <small className="form-text text-danger">{errors.password2}</small>
              </div>
              <div className="" >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    // letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large btn-primary "
                >
                  Sign up
                </button>
              </div>
            </form>
            {this.state.errors !=null ? <p>{JSON.stringify(this.errors)}</p> : null}
            {this.state.data !=null ? <p>{JSON.stringify(this.state.data)}</p> : null}
          </div>
        </div>
        
      </div>
    );
  }
}

Register.contextType = LoginContext
export default Register;