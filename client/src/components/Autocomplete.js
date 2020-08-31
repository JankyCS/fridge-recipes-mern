import React, { Component } from "react";
import ingredientJSON from "../ingredients"
import ReactDOM from "react-dom"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import {LoginContext} from "../LoginContext";

class Autocomplete extends Component {

    constructor(props){
        super(props)

        this.searchInput = React.createRef()
        this.ingredients = ingredientJSON.ingredients
        this.state = {
            suggestions: [],
            value: ""
        }

        this.onChange = this.onChange.bind(this)
        this.showSuggestions = this.showSuggestions.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.hideSuggestions = this.hideSuggestions.bind(this)
    }

    onChange(e){
        const ingredients = this.ingredients
        let value = e ? e.target.value :this.state.value
        value = value.replace(/[^a-zA-Z]/g, " ");
        this.setState({value}, () => {

            setTimeout(() => {
                let suggestions = []
                let first = []
                let others = []
                
                if(value.length>0){
                    const regex = new RegExp(`${value}`,'i')
                    //suggestions = ingredients.filter(v => regex.test(v))
                    for(let i=0 ;i<ingredients.length; i++)
                    {
                        if (ingredients[i].indexOf(value.toLowerCase()) == 0) {
                            first.push(ingredients[i]);
                        }
                        else if(regex.test(ingredients[i])){
                            others.push(ingredients[i])
                        }
                        if(first.length>6){
                            break;
                        }
                    }
                }
                //suggestions = first.concat([])
                let i = 0
                while(first.length<7 && others.length>i){
                    first.push(others[i++])
                }
                suggestions = first
                this.setState({suggestions})
            },300)
            
        })

        
    }

    showSuggestions(){
        const {suggestions} = this.state
        if(this.state.suggestions.length>0){
            return <ul>{suggestions.map(suggestion => <li key={suggestion} onClick={()=>{

                //Add to fridge then reset state
                this.setState({value:"",suggestions:[]})
                
            }} style={{cursor: "pointer"}}>{suggestion}</li>)}</ul>
        }
        return null
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(e.target.value)

        //Add e.target.value to fridge, then reset state
        this.setState(
            {
                value: "",
                suggestions: []
            }
        )

        //Remove focus after use enters an ingredient 
        //Maybe remove this? Keeping focus makes it easy to input many ingredients consecutively
        this.searchInput.current.blur()

    };
    
    hideSuggestions(e) {
        e.preventDefault();
        this.setState(
            {
                suggestions: []
            }
        )
    }

    

  render() {
    
    return (
    //<Router>
      <div >
        <form className="AutoCompleteText" noValidate onSubmit={this.onSubmit} style={{float:"left"}}>
            <input ref={this.searchInput} value={this.state.value} onChange={this.onChange}type="text"/> {/*onBlur={this.hideSuggestions}*/} 
            {/* <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" classname="form-text text-muted">We'll never share your email with anyone else.</small>
            </div> */}
            <a href="" className="material-icons addButton" onClick={this.onSubmit}>add_circle_outline</a>
            
            {this.showSuggestions()}    
        </form>
      </div>
      //</Router>
    );
  }
}
export default Autocomplete;