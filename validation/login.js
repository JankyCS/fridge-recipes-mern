const Validator = require('validator')
const isEmpty = require("is-empty");

module.exports = function validateLogin(user){
    let errors = {}

    data.email = data.email ?? ''
    data.password = data.password ?? ''
   
    // //Username Validation
    // if(Validator.isEmpty(data.username)){
    //     errors.username = "Username field is required"
    // }

    //Email Validation
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required"
    }
    else if(!Validator.isEmail(data.email)){
        errors.email = "Invalid email"
    }
    //Password Validation
    if(Validator.isEmpty(data.password)){
        errors.password = "Password Required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}