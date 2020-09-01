import React, { Component } from "react";

function RecipeCard(props) {
    const {recipe} = props
    let {title,usedIngredientCount,missedIngredientCount,usedIngredients,missedIngredients} = recipe
    let used = []
    let missing = []
    for(let i =0;i<usedIngredientCount;i++){
        used.push(usedIngredients[i].name)
    }
    for(let i =0;i<missedIngredientCount;i++){
        missing.push(missedIngredients[i].name)
    }

    return(
        <div className="card" style={{display:"inline-block",width:"18rem"}}>
            <img className="card-img-top" src="https://spoonacular.com/recipeImages/666439-312x231.jpg" alt="Card image cap" height="200"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{textTransform: "capitalize"}}>Have: {used.toString()}.</p>
                <p className="card-text" style={{textTransform: "capitalize"}}>Missing: {missing.toString()}.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
            
        
    )
}

export default RecipeCard