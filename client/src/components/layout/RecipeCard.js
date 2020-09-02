import React, { Component, useState, useEffect  } from "react";

function RecipeCard(props) {

    const {recipe} = props
    let {title,href,thumbnail,ingredients} = recipe
    const [image,setImage] = useState("")
    let getAnotherImage=0;

    title = title.replace('&#233;','e')

    useEffect(() => {
        setImage("")
       imageRequest()
    }, [recipe,getAnotherImage]);
      
    const imageRequest = ()=>{
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
          if(response.ok){
              //console.log("Good")
              //this.props.history.push("/login");
          }
          return r
      })
      .then(data => {
          if(true){
            //   console.log("Recipes is "+JSON.stringify(data))
              setImage(data.imgUrl)
              
            //   console.log("thumbnail is"+thumbnail)
        }
      })
      .catch(err=>{
          console.log("Error is: "+err)
      })
    }

    return(
        image!=""?
        <div className="card" style={{display:"inline-block",width:"100%",zIndex:0}}>
            <img className="card-img-top" src={image} alt="Card image cap" onError={()=>{console.log("Image error get another");setImage("https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg");}}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {/* {/* <p className="card-text" style={{textTransform: "capitalize"}}>Have: {used.toString()}.</p> */}
                <p className="card-text" style={{textTransform: "capitalize"}}><b>Ingredients:</b> {ingredients.toString()}</p> 
                <a href={href} className="btn btn-primary" target="_blank">View Recipe</a>
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