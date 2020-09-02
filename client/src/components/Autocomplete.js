import React, { Component } from "react";
import ingredientJSON from "../newIngredients.json"
import ReactDOM from "react-dom"

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
        this.addToFridge = this.addToFridge.bind(this)
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
                    for(let i=0 ;i<ingredients.length; i++)
                    {
                        if (ingredients[i]['name'].indexOf(value.toLowerCase()) == 0) {
                            first.push(ingredients[i]);
                        }
                        else if(regex.test(ingredients[i]['name'])){
                            others.push(ingredients[i])
                        }
                        if(first.length>6){
                            break;
                        }
                    }
                }
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
            return <ul>{suggestions.map(suggestion => <li key={suggestion['id']} onClick={()=>{

                //Add to fridge then reset state
                this.addToFridge(suggestion['name'])
                this.setState({value:'',suggestions:[]})
                
                
            }} style={{cursor: "pointer"}}>{suggestion['name']}</li>)}</ul>
        }
        return null
    }

    onSubmit(e) {
        e.preventDefault();
        this.addToFridge(this.state.value)
        this.searchInput.current.blur()
    };

    addToFridge(value){
        if(value.length>0){
            this.props.add(value)

            this.setState({
                value: "",
                suggestions: []
            })
        }
        
    }
    
    hideSuggestions(e) {
        e.preventDefault();
        setTimeout(() => {
            this.setState(
            {
                suggestions: []
            }
        )
        }, 300);
        
    }

    

  render() {
    
    return (
      <div >
        <form className="AutoCompleteText" noValidate onSubmit={this.onSubmit} style={{float:"left",marginBottom:20}}>
            <input ref={this.searchInput} value={this.state.value} onChange={this.onChange}type="text" onBlur={this.hideSuggestions}/> {/*onBlur={this.hideSuggestions}*/} 
            <a href="" className="material-icons addButton" onClick={this.onSubmit}>add_circle_outline</a>
            
            {this.showSuggestions()}    
        </form>
      </div>
    );
  }
}
export default Autocomplete;