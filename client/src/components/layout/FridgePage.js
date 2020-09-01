import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {LoginContext} from "../LoginContext";
import Autocomplete from "../Autocomplete"
import Ingredient from "./Ingredient"
const dotenv = require('dotenv').config()

class FridgePage extends Component {

    constructor(props){
      super(props);
      // console.log("the context is"+this.context)
      //const {token} = this.context;
      // this.showFridge = this.showFridge.bind(this)
      this.state = {
          fridge:null
      }
      this.updateFridge = this.updateFridge.bind(this)
      this.addToFridge = this.addToFridge.bind(this)
      this.removeFromFridge = this.removeFromFridge.bind(this)
      this.getRecipes = this.getRecipes.bind(this)

  };
    
    componentDidMount(){
      const {loggedIn} = this.context
      if(!loggedIn){
          console.log("redirecting here1")
          this.props.history.push("/");
      }
      else{
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
            if(!data.error){
                console.log("Data is "+JSON.stringify(data))
                this.setState({fridge:data.fridge})
            }
            else{
              this.context.toggleLogout()
              this.props.history.push("/login");
            }
         })
      }
        
    };

  updateFridge(){
    // console.log(this.state.fridge.toString())
    const {token} = this.context
    const userData = {
        token,
        food:this.state.fridge.toString()
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }
    fetch('/api/users/edit-fridge', requestOptions)
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
            //this.setState({fridge:data.fridge.sort()})
        
        }
      })
  }

  addToFridge(food){
    console.log(food)
    this.setState((prev)=>{
      
      let f =[...prev.fridge,food.toLowerCase()]
      f.sort()
      return {
        fridge: f
      }
    },()=>{this.updateFridge()})
  }

  removeFromFridge(food){
    console.log(food)
    this.setState((prev)=>{
      
      let f =[...prev.fridge]
      const index = f.indexOf(food)
      f.splice(index,1)
      // f.sort()
      return {
        fridge: f
      }
    },()=>{this.updateFridge()})
  }

  getRecipes(){
    if(this.context.loggedIn){
      console.log("pog???")
      // console.log("Will it reach here?api key is "+process.env.REACT_APP_SPOONACULAR)
    }
    else{
      console.log("nope not loggedIn")
    }
    // const url = "https://api.spoonacular.com/recipes/findByIngredients?"+
    //             "apiKey="+process.env.REACT_APP_SPOONACULAR+
    //             "&ingredients="+"rice,dates"+
    //             "&number=10"

    // fetch(url)
    // .then(response => {
    // const r = response.json()
    //     if(response.ok){
    //         //console.log("Good")
    //         //this.props.history.push("/login");
    //     }
    //     return r
    // })
    // .then(data => {
    //     if(true){
    //         console.log("Recipes is "+JSON.stringify(data))
    //     }
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  }

  render() {
    // const {loggedIn} = this.context

    // if(!loggedIn){
    //   console.log("redirecting here2")
    //     this.props.history.push("/");
    // }

    this.getRecipes()


    return (
    //<Router>
      <div className="container-fluid">
        <div  className="row">
          <div style={{minHeight: 320}} className="col-md-4 overflow-auto">
            <h1 onClick={()=>this.getRecipes()}>
                Fridge
                
            </h1>
            <Autocomplete add={this.addToFridge}/>

            {
               this.state.fridge?this.state.fridge.map(item => <Ingredient key={item} name={item} remove={this.removeFromFridge}/>):<p>Load</p>
            }
            {this.state.fridge?this.state.fridge.toString():<p>Loading</p>}
          </div>
          <div className="col-md-8">
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