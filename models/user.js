const mongoose = require("mongoose");

const  UserSchema = new mongoose.Schema({

    fullname : {
        type: String,
        required : true,
    },

    username : {
        type: String,
        required : true,
        unique: true
    },

    email : {
        type: String,
        required : true,
        unique: true,
    },

    phone : {
        type: String,
        required : true,
    },

    password : {
        type: String,
        required : true,
    },

    role : {
        type: String,
    },

    etat : {
        type: Boolean
    },
    
    image : {
        type: String,
        default: '',
    },

})


const User = mongoose.model("user", UserSchema);

module.exports = User;