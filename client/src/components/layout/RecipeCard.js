import React, { useState, useEffect  } from "react";

//Recipe Card
function RecipeCard(props) {
    const {recipe} = props
    let {title,href,ingredients} = recipe
    const [image,setImage] = useState("")

    title = title.replace('&#233;','e')
    title = title.replace('&amp;','&')

    //Upon getting recipe, make call to backend to search for picture based on recipe title
    useEffect(() => {
        setImage("")
        const userData = {
          query:title
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }
        fetch('/api/recipe/image', requestOptions)
        .then(response => {
        const r = response.json()
            return r
        })
        .then(data => {
            setImage(data.imgUrl)
        })
        .catch(err=>{
            console.log("Error is: "+err)
        })
    }, [recipe,title]);

    return(
        image!==""?
        <div className="card" style={{display:"inline-block",width:"100%",zIndex:0}}>
            <img className="card-img-top" src={image} alt="Food Pic" onError={()=>{setImage("https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg")}}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{textTransform: "capitalize"}}><b>Ingredients: </b> {ingredients.toString()}</p> 
                <a href={href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Recipe</a>
            </div>
        </div>:
        <div className="card" style={{display:"inline-block",height:"500px",width:"100%"}}>
            <div className="d-flex align-center justify-content-center" style={{paddingTop:"130px"}}>
           <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
            </div>
            </div>
        </div>
    )
}

export default RecipeCard