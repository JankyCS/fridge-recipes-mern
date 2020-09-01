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
import RecipeCard from "./RecipeCard"
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

      this.testRecipe = {
        "id": 666439,
        "title": "Homemade Ricotta",
        "image": "https://spoonacular.com/recipeImages/666439-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 2,
        "missedIngredientCount": 1,
        "missedIngredients": [
            {
                "id": 1049,
                "amount": 3,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "half & half",
                "original": "3 cups half & half",
                "originalString": "3 cups half & half",
                "originalName": "half & half",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg"
            }
        ],
        "usedIngredients": [
            {
                "id": 1077,
                "amount": 5,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "full-fat milk",
                "original": "5 cups full-fat buttermilk",
                "originalString": "5 cups full-fat buttermilk",
                "originalName": "full-fat buttermilk",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
            },
            {
                "id": 1077,
                "amount": 5,
                "unit": "qt",
                "unitLong": "quarts",
                "unitShort": "qt",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "whole milk",
                "original": "5 qt. whole milk",
                "originalString": "5 qt. whole milk",
                "originalName": "whole milk",
                "metaInformation": [
                    "whole"
                ],
                "meta": [
                    "whole"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
            }
        ],
        "unusedIngredients": [],
        "likes": 1564
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
                console.log(data.fridge.length)
                console.log("Data is p"+JSON.stringify(data))
                if(data.fridge.length==1 && data.fridge[0].length==0){
                    this.setState({fridge:[]})
                }
                else{
                  this.setState({fridge:data.fridge},this.getRecipes())

                }
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

      this.getRecipes()
  }

  addToFridge(food){
    console.log(food)
    if(!this.state.fridge.includes(food.toLowerCase())){
    this.setState((prev)=>{
      
      let f =[...prev.fridge,food.toLowerCase()]
      f.sort()
      return {
        fridge: f
      }
    },()=>{this.updateFridge()})
    }
    
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
    this.setState({
      recipes:[]
    })
    // if(this.context.loggedIn){
    //   console.log("pog???")

    //   const {token} = this.context
    //   const userData = {
    //       token,
    //       assumePantryItems:1
    //   };
    //   const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(userData)
    //   }
    //   fetch('/api/users/get-recipes', requestOptions)
    //   .then(response => {
    //   const r = response.json()
    //       if(response.ok){
    //           //console.log("Good")
    //           //this.props.history.push("/login");
    //       }
    //       return r
    //   })
    //   .then(data => {
    //       if(true){
    //           console.log("Recipes is "+JSON.stringify(data))
    //           this.setState({recipes:data})
          
    //       }
    //     })
    //   // console.log("Will it reach here?api key is "+process.env.REACT_APP_SPOONACULAR)
    // }
    // else{
    //   console.log("nope not loggedIn")
    // }
    
  }

  render() {
    // const {loggedIn} = this.context

    // if(!loggedIn){
    //   console.log("redirecting here2")
    //     this.props.history.push("/");
    // }

    // this.getRecipes()


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
          <div className="col-md-8 overflow-auto">
            <h1>
                Recipes Section
            </h1>
            <RecipeCard recipe={this.testRecipe}/>
            {this.state.recipes?JSON.stringify(this.state.recipes[0]):<p>Loading</p>}
          </div>
          
        </div>
       
      </div>
      //</Router>
    );
  }
}
FridgePage.contextType = LoginContext
export default FridgePage;