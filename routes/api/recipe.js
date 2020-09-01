const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

router.post("/image", (req, res) => {
    const {query} = req.body;
    const url = "https://api.qwant.com/api/search/images?count=50&q="+query+"&t=images&safesearch=1&locale=en_US&uiv=4"
                
                
    console.log("The url is  "+url)
    // console.log("As a string:"+user.fridge.toString())
    fetch(url)
    .then(response => {
    const r = response.json()
        if(response.ok){
            //console.log("Good")
            //this.props.history.push("/login");
        }
        return r
    })
    .then(data => {
        if(data.status=="success"){
            const numOptions = data.data.result.total
            const choice = Math.floor(Math.random() * numOptions); 
            console.log(choice)
            res.json({imgUrl:data.data.result.items[choice].media})
        }
        else{
            res.json({imgUrl:"https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg"})

        }
    })
    .catch((error) => {
        res.json({imgUrl:"https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-768.jpg"})
        console.error('Error:', error);
      
    });
      
    
  });

module.exports = router;