import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";
import Autocomplete from "../Autocomplete"

class FridgePage extends Component {

    constructor(props){
        super(props);
        console.log("the context is"+this.context)
        //const {token} = this.context;
        // this.showFridge = this.showFridge.bind(this)
        this.state = {
            fridge:null
        }

  };
    
    componentDidMount(){
        const {token} = this.context
        const userData = {
            token
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }
        fetch('/api/users/get-fridge', requestOptions)
        .then(response => {
        const r = response.json()
            if(response.ok){
                //console.log("Good")
                //this.props.history.push("/login");
            }
            return r
        })
        .then(data => {
            if(true){
                console.log("Data is "+JSON.stringify(data))
                this.setState({fridge:data.fridge})
            
            }


         })
    };

  render() {
    const {loggedIn} = this.context

    if(!loggedIn){
        this.props.history.push("/");
    }


    return (
    //<Router>
      <div className="container-fluid">
        <div style={{height: "80vh"}}  className="row">
          <div style={{height: "100%"}} className="col-sm-4 overflow-auto">
            <h1>
                Fridge
                
            </h1>
            <Autocomplete/>
            {this.state.fridge?this.state.fridge.toString():<p>Loading</p>}
          </div>
          <div className="col-sm-8">
            <h1>
                Recipes Section
            </h1>
          </div>
          
        </div>
       
      </div>
      //</Router>
    );
  }
}
FridgePage.contextType = LoginContext
export default FridgePage;