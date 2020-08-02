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

app.get('/myPost/:id',async (req,res) =>{
    try {
        let id = req.params.id;
        let posts = await Post.find({userId: id});
        res.status(200).send(posts);

    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})

app.get('/detail/:id', async (req,res) =>{
    try {
        let id = req.params.id;
        let post = await Post.findOne({_id : id});
        res.status(200).send(post);
        
    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})

app.delete('/delete/:postId', (req,res) =>{

    let id = req.params.postId;

    Post.findOneAndRemove({_id:id})
    .then((post) => {
        if(!post){
            res.status(400).send({message: "post not found !"})
        }else{
            res.status(200).send(post);
        }
    })
    .catch(()=>{
        res.status(400).send({message: "error !"})
    })
})

module.exports = app;