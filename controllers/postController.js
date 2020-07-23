const express = require('express');

const mongoose = require('../db/connect');

const Post = require('../models/post');


const jwt = require('jsonwebtoken');

const app = express();

//Post 
/*
app.post('/add', (req, res) => {
    //1 - nekhou les données
    let data = req.body;

    //2 - creation d'un object <= data
    let post = new Post({
        title: data._title,
        userId: data._userId,
        amount: data._amount,
        type: data._type,
        description: data._description,
        follower: null,
        donors: null,
    });
    console.log(post);

    post.save()
        .then(() => {
            res.status(200).send({ message: "post added succefully !" });
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

*/

module.exports = app;