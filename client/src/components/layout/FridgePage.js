import React, { Component } from "react";
import {LoginContext} from "../LoginContext";
import Autocomplete from "../Autocomplete"
import Ingredient from "./Ingredient"
import RecipeCard from "./RecipeCard"

class FridgePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        fridge:null,
        query:"",
        recipes:null,
        msg:"Loading..."
    }

    this.queryInput = React.createRef()
    this.updateFridge = this.updateFridge.bind(this)
    this.addToFridge = this.addToFridge.bind(this)
    this.removeFromFridge = this.removeFromFridge.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.getRecipePuppy = this.getRecipePuppy.bind(this)
    this.searchQuery = this.searchQuery.bind(this)
    this.editQuery = this.editQuery.bind(this)

  }
    
  componentDidMount(){
    const {loggedIn} = this.context

    //Redirect if not logged in
    if(!loggedIn){
        this.props.history.push("/");
    }
    //Otherwise get the user's fridge data from backend
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
          return r
      })
      .then(data => {
          if(!data.error){
              if(data.fridge.length===1 && data.fridge[0].length===0){
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
          //Get recipes corresponding to users fridge
          this.getRecipePuppy()
        })
    }
  };

  // Send the current fridge state to backend to sync
  updateFridge(){
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
      return r
    })
    .then(
      d=>{
        this.getRecipePuppy()
      }
    )
  }

  // Add food to fridge if not already in
  addToFridge(food){
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

  //Remove item from fridge
  removeFromFridge(food){
    this.setState((prev)=>{
      
      let f =[...prev.fridge]
      const index = f.indexOf(food)
      f.splice(index,1)
      return {
        fridge: f
      }
    },()=>{this.updateFridge()})
  }

  //Get recipes from backend, helper method
  getRecipes(p){
    if(p>30){
      this.setState({recipes:[],msg:"No Recipes Found. Try a different search query, or editing your fridge!"})
      return
    }
    const {token} = this.context
    const userData = {
      token,
      query:this.state.query,
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
        return r
    })
    .then(data => {
      if(data.error || data.results.length===0){
        this.getRecipes(p+1)
      }
      else{
        this.setState(prev=>{
          let f = prev.recipes ? [...prev.recipes] : []
          f = f.concat(data.results)
          return {
            recipes: f
          }
        },()=>{
          //if(this.state.recipes.length<5)
          if(false){
            this.getRecipes(p+1)
          }
        })
        
      }
    })
    .catch(err=>{
        console.log("Error is: "+err)
    })
      
  }

  //Get recipes from backend
  getRecipePuppy(){
    let p = 1
    // let p = Math.floor(Math.random() * 20)+1; 
    this.setState({recipes:[],msg:"Loading..."},()=>{this.getRecipes(p)})
  }

  //Search recipes with query
  searchQuery(e){
    e.preventDefault()
    this.setState({recipes:null})
    this.getRecipePuppy()
    this.queryInput.current.blur()
  }

  //Search query form handler
  editQuery(e){
    this.setState({
      query:e.target.value
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div  className="row" >
          <div style={{minHeight: 320}} className="col-md-4 overflow-auto recipeSection">
            <h1 style={{marginTop:15}}>
                Fridge
            </h1>
            <Autocomplete add={this.addToFridge}/>
            {
               this.state.fridge?
               this.state.fridge.map(item => <Ingredient key={item} name={item} remove={this.removeFromFridge}/>)
               :<p>Loading...</p>
            }
          </div>
          <div className="col-md-8 overflow-auto recipeSection">
            <h1 style={{marginTop:15}}>
                Your Recipes
            </h1>
             <form className="AutoCompleteText" noValidate onSubmit={this.searchQuery} style={{marginBottom:20}}>
                <input ref={this.queryInput} value={this.state.query} onChange={this.editQuery} type="text" placeholder="Search a cuisine (Indian, Chinese, Jamaican), a food (Burger, fried rice, pizza), or anything else you want!"/> 
                <span className="material-icons addButton" onClick={this.searchQuery} style={{cursor: "pointer"}}>send</span>
            </form>
            {this.state.recipes && this.state.recipes.length>0? <div className="card-columns recipeColumn">{this.state.recipes.map((recipe,i) => <RecipeCard key={i} recipe={recipe}/>)}</div>:<p>{this.state.msg}</p>}
          </div>
        </div>
      </div>
    );
  }
}
FridgePage.contextType = LoginContext
export default FridgePage;