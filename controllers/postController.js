const express = require('express');

const mongoose = require('../db/connect');

const Post = require('../models/post');


const jwt = require('jsonwebtoken');

const app = express();




//Get
app.get('/all',async (req,res) =>{
    try {
        let posts = await Post.find();
        res.status(200).send(posts);
        console.log(posts);

    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})

module.exports = app;