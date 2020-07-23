const mongoose = require("mongoose");

const  PostSchema = new mongoose.Schema({

    title : {
        type: String,
    },
    userId : {
        type: String,
    },
    amount : {
        type: String,
    },
    type : {
        type: String,
    },
    description : {
        type: String,
    },
    follower : {
        type: String,
    },
    donors : {
        type: String,
    },
    image : {
        type: String,
        default: '',
    },

})


const Post = mongoose.model("post", PostSchema);

module.exports = Post;
