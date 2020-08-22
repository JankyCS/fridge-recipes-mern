const Validator = require('validator')
const isEmpty = require("is-empty");

module.exports = function validateSignUp(data){
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
    //Name Validation
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required"
    }
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
    else if(!Validator.isLength(data.password,{min:6})){
        errors.password = "Password must be at least 6 characters"
    }
    else if(Validator.isEmpty(data.password2)){
        errors.password2 = "Please Confirm your Password"
    }
    else if(!Validator.equals(data.password,data.password2)){
        errors.password2 = "Passwords do not match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}