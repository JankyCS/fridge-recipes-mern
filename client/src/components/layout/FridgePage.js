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
          fridge:null,
          query:""
      }

      this.queryInput = React.createRef()
      this.updateFridge = this.updateFridge.bind(this)
      this.addToFridge = this.addToFridge.bind(this)
      this.removeFromFridge = this.removeFromFridge.bind(this)
      this.getRecipes = this.getRecipes.bind(this)
      this.getRecipePuppy = this.getRecipePuppy.bind(this)
      this.searchQuery = this.searchQuery.bind(this)
      this.editQuery = this.editQuery.bind(this)

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

  searchQuery(e){
    e.preventDefault()
    console.log(this.state.query)
    this.getRecipePuppy()
    this.queryInput.current.blur()
    // console.log(queryInput)
  }

  editQuery(e){
    this.setState({
      query:e.target.value
    })
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
            {/* {this.state.fridge?this.state.fridge.toString():<p>Loading</p>} */}
          </div>
          <div className="col-md-8 overflow-auto recipeSection" style={{}}>
            <h1>
                Your Recipes
            </h1>
             <form className="AutoCompleteText" noValidate onSubmit={this.searchQuery} style={{marginBottom:20}}>
                <input ref={this.queryInput} value={this.state.query} onChange={this.editQuery} type="text" placeholder="Ex. Indian, Sushi, Jamaican, Burger"/> 
                <a href="" className="material-icons addButton" onClick={this.searchQuery}>send</a>
                 
            </form>
            <div className="card-columns recipeColumn" style={{}}>
            {this.state.recipes&&this.state.recipes.length>0? this.state.recipes.map((recipe,i) => <RecipeCard key={i} recipe={recipe}/>):<p>Loading</p>}

            
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