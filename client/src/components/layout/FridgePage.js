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

    this.testRecipe2 = {
        "id": 600531,
        "title": "Instant khoya – Quick and easy mawa",
        "image": "https://spoonacular.com/recipeImages/600531-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 2,
        "missedIngredientCount": 1,
        "missedIngredients": [
            {
                "id": 93632,
                "amount": 0.5,
                "unit": "tablespoon",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp",
                "aisle": "Ethnic Foods",
                "name": "ghee",
                "original": "Ghee (Clarified butter) - ½ tablespoon",
                "originalString": "Ghee (Clarified butter) - ½ tablespoon",
                "originalName": "Ghee (Clarified butter)",
                "metaInformation": [
                    "(Clarified butter)"
                ],
                "meta": [
                    "(Clarified butter)"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/ghee.jpg"
            }
        ],
        "usedIngredients": [
            {
                "id": 1077,
                "amount": 1.5,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "full-fat milk",
                "original": "Full fat milk powder - 1½ cups",
                "originalString": "Full fat milk powder - 1½ cups",
                "originalName": "Full fat milk powder",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
            },
            {
                "id": 1077,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "milk",
                "original": "Milk - ¼ cup",
                "originalString": "Milk - ¼ cup",
                "originalName": "Milk",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
            }
        ],
        "unusedIngredients": [],
        "likes": 80
    }
      this.updateFridge = this.updateFridge.bind(this)
      this.addToFridge = this.addToFridge.bind(this)
      this.removeFromFridge = this.removeFromFridge.bind(this)
      this.getRecipes = this.getRecipes.bind(this)
      this.getRecipePuppy = this.getRecipePuppy.bind(this)

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
                  this.setState({fridge:data.fridge})

                }
            }
            else{
              this.context.toggleLogout()
              this.props.history.push("/login");
            }
         })
         .then(d=>{
           this.getRecipePuppy()
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
    .then(
      d=>{
        this.getRecipePuppy()
      }
    )

    
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

  getRecipes(p){
    if(p>100){
      return
    }
    const {token} = this.context
    const userData = {
      token,
      query:"",
      page:p
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }
    fetch('/api/users/recipe-puppy', requestOptions)
    .then(response => {
    const r = response.json()
        if(response.ok){
            //console.log("Good")
            //this.props.history.push("/login");
        }
        return r
    })
    .then(data => {
      if(data.error){
        this.getRecipes(p+1)
      }
      else{
        console.log("Recipes is "+JSON.stringify(data))
        this.setState({recipes:data.results})
      }
    })
    .catch(err=>{
        console.log("Error is: "+err)
    })
      
  }

  getRecipePuppy(){
    let p = Math.floor(Math.random() * 20)+1;  
    this.getRecipes(p)
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
          <div style={{minHeight: 320}} className="col-md-4 overflow-auto recipeSection">
            <h1 onClick={()=>this.getRecipePuppy()}>
                Fridge
                
            </h1>
            <Autocomplete add={this.addToFridge}/>

            {
               this.state.fridge?this.state.fridge.map(item => <Ingredient key={item} name={item} remove={this.removeFromFridge}/>):<p>Load</p>
            }
            {this.state.fridge?this.state.fridge.toString():<p>Loading</p>}
          </div>
          <div className="col-md-8 overflow-auto recipeSection" style={{}}>
            <h1>
                Your Recipes
            </h1>

            <div className="card-columns recipeColumn" style={{}}>
            {this.state.recipes&&this.state.recipes.length>0? this.state.recipes.map(recipe => <RecipeCard recipe={recipe}/>):<p>Loading</p>}

            
            </div>
          </div>
          
        </div>
       
      </div>
      //</Router>
    );
  }
}
FridgePage.contextType = LoginContext
export default FridgePage;