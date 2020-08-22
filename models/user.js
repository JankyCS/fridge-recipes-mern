var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema to model a user and their pertinent information
var UserSchema = new Schema
(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        
    }
);

module.exports=mongoose.model("User",UserSchema);