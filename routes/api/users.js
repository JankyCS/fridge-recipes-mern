const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSignup = require("../../validation/register");
const validateLogin = require("../../validation/login");
// Load User model
const User = require("../../models/user");
const fetch = require("node-fetch");

require('dotenv').config();

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateSignup(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            fridge: []
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    }
  });
});

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLogin(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
            payload,
            process.env.secretOrKey,
            {
                expiresIn: 604800 // 1 Week in seconds
            },
            (err, token) => {
                res.json({
                    success: true,
                    token: token
                });
            }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/refresh", (req, res) => {
    // Form validation
    const token = req.body.token;

    jwt.verify(token,process.env.secretOrKey, (err,decoded) =>{
      if(err){
        console.log(err)
        return res
          .status(400)
          .json({ error: "Invallid/Expired Token" });
      }
      else{
        const payload = {
          id: decoded.id,
          name: decoded.name
        };

        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
              expiresIn: 604800 // 1 Week in seconds
          },
          (err, token) => {
              if(err)
              {
                return res
                  .status(400)
                  .json({ error: err });
              }
              
              else{
              
                  return res.json({
                    success: true,
                    token: token
                  });
              }
              
          }
        );
      }
    })
  });

router.post("/edit-fridge", (req, res) => {
    // Form validation
    const {token, food} = req.body;
    var newFridge

    if(!food){
      newFridge = []
    }
    try {
      newFridge = food.split(',')
    } catch (error) {
      console.log(error)
      newFridge=[]
    }

    jwt.verify(token,process.env.secretOrKey, (err,decoded) =>{
      if(err){
        console.log(err)
        return res
          .status(400)
          .json({ error: "Invallid/Expired Token" });
      }
      else{
        var user_id = decoded.id; 
        User.findByIdAndUpdate(user_id, { fridge: newFridge }, 
          function (err, docs) { 
            if (err){ 
              return res
                .status(400)
                .json({ error: err});
                console.log(err) 
            } 
            else{ 
              return res.json({
                success: true
              });
                
            } 
        });
      }
    })
  });

  router.post("/get-fridge", (req, res) => {
    const {token} = req.body;
    jwt.verify(token,process.env.secretOrKey, (err,decoded) =>{
      if(err){
        console.log(err)
        return res
          .status(400)
          .json({ error: "Invallid/Expired Token"});
      }
      else{
        var user_id = decoded.id; 
        User.findById(user_id, function(err, user) {
          if(err){
            res
            .status(400)
            .json({ error: err });
          }
          if(!user){
            res
            .status(400)
            .json({ error: "no user" });
          }
          res.json({
            fridge: user.fridge
          })
        });
      }
    })
  });

  router.post("/get-recipes", (req, res) => {
    const {token,assumePantryItems} = req.body;
    const pantry = assumePantryItems==1? true : false

    jwt.verify(token,process.env.secretOrKey, (err,decoded) =>{
      if(err){
        console.log(err)
        return res
          .status(400)
          .json({ error: "Invallid/Expired Token"});
      }
      else{
        var user_id = decoded.id; 
        User.findById(user_id, function(err, user) {
          if(err){
            res
            .status(400)
            .json({ error: err });
          }
          if(!user){
            res
            .status(400)
            .json({ error: "User not found" });
          }
          else{
            const url = "https://api.spoonacular.com/recipes/complexSearch?"+
                        "apiKey="+process.env.SPOONACULAR_KEY+
                        "&includeIngredients="+user.fridge.toString()+
                        "&number=2"+
                        "&ignorePantry="+pantry+
                        "&instructionsRequired=true"+
                        "&fillIngredients=true"
                        
            fetch(url)
            .then(response => {
            const r = response.json()
                return r
            })
            .then(data => {
              res.json(data)
            })
            .catch((error) => {
              res
              .status(400)
              .json({ error });
              console.error('Error:', error);
            });
            
            
          }
         
        });
      }
    })
  });

  router.post("/recipe-puppy", (req, res) => {
    const {token,query,page} = req.body;
    jwt.verify(token,process.env.secretOrKey, (err,decoded) =>{
      if(err){
        console.log(err)
        return res
          .status(400)
          .json({ error: "Invallid/Expired Token"});
      }
      else{
        var user_id = decoded.id; 
        User.findById(user_id, function(err, user) {
          if(err){
            res
            .status(400)
            .json({ error: err });
          }
          if(!user){
            res
            .status(400)
            .json({ error: "User not found" });
          }
          else{
            console.log("User Has "+user.fridge.toString())
            let url = "http://www.recipepuppy.com/api/?i="+user.fridge.toString()+
                        "&p="+page
            if(query&&query!=""){
              url=url+"&q="+query
            }
            console.log(url)        
            fetch(url)
            .then(response => {
            const r = response.json()
                return r
            })
            .then(data => {
              res.json(data)
            })
            .catch((error) => {
              res
              .status(400)
              .json({ error});
              console.error('Error:', error);
            });
            
            
          }
         
        });
      }
    })
  });

module.exports = router;