const express = require('express');

const mongoose = require('../db/connect');

const User = require('../models/user');

const bcrypt = require('bcryptjs');



const jwt = require('jsonwebtoken');

const app = express();


//Get
app.get('/all',async (req,res) =>{
    try {
        let users = await User.find({role: "user"});
        res.status(200).send(users);

    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})


app.get('/active', (req,res) =>{

    User.find({role: "user",etat: true})
    .then((users) => {
        res.status(200).send(users);
    })
    .catch(()=>{
        res.status(400).send({message: "error !"})
    })
})

app.get('/one/:idUser',async (req,res) =>{

    try {
        let id = req.params.idUser;
        let user = await  User.findOne({role: "user", _id:id});

        if(!user){
            res.status(400).send({message: "user not found !"})
        }else{
            res.status(200).send(user);
        }

    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})

app.get('/profile/:idUser',async (req,res) =>{

    try {
        let id = req.params.idUser;
        let user = await  User.findOne({_id:id});

        if(!user){
            res.status(400).send({message: "user not found !"})
        }else{
            res.status(200).send(user);
        }

    } catch (error) {
        res.status(400).send({message: "error !"})
    }
})


//Post 
app.post('/register', (req, res) => {
    //1 - nekhou les données
    let data = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hashedpassword = bcrypt.hashSync(data._password, salt);

    //2 - creation d'un object <= data
    let user = new User({
        fullname: data._fullname,
        username: data._username,
        email: data._email,
        phone: data._phone,
        password: hashedpassword,
        role: "user",
        etat: false
    });
    console.log(user);

    user.save()
        .then(() => {
            res.status(200).send({ message: "User registred succefully !" });
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.post('/login', (req,res) =>{

    let email = req.body._email;
    let password = req.body._password;

    User.findOne({email: email })
    .then( (user)=>{
        if(!user){
            res.status(400).send({ message: "email incorrect!" });
        }else{
            let compare = bcrypt.compareSync(password, user.password);

            if(!compare){
                res.status(404).send({message: "password incorrect!" });
            }else{
                //json web token 
                let objet = {
                    id: user._id,
                    role: user.role,
                    etat: user.etat,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                }

                let mytoken = jwt.sign(objet, "myKey");
                res.status(200).send({token: mytoken });
            }
        }
    } )

    .catch((e) => {
        res.status(400).send(e);
    });

})

//delete

app.delete('/delete/:idUser', (req,res) =>{

    let id = req.params.idUser;

    User.findOneAndRemove({role: "user", _id:id})
    .then((user) => {
        if(!user){
            res.status(400).send({message: "user not found !"})
        }else{
            res.status(200).send(user);
        }
    })
    .catch(()=>{
        res.status(400).send({message: "error !"})
    })
})

//patch
//update state
app.patch('/update-state/:idUser', (req,res) =>{

    let id = req.params.idUser;

    User.findOne({role: "user", _id:id})
    .then((user) => {
        if(!user){
            res.status(400).send({message: "user not found !"})
        }else{
            user.etat = !user.etat;
            user.save();
            res.status(200).send({message: "State updated !"});
        }
    })
    .catch(()=>{
        res.status(400).send({message: "error !"})
    })
})

//update all info

app.patch('/update/:idUser', (req, res) => {

    let id = req.params.idUser;
    let data = req.body;

    //2 - creation d'un object <= data
    let userUpdated = new User({
        firstname: data._firstname,
        lastname: data._lastname,
        email: data._email,
        phone: data._phone,
        role: "user",
        etat: false
    });

    User.findOne({role: "user", _id:id})
    .then((user) => {
        if(!user){
            res.status(400).send({message: "user not found !"})
        }else{
            user.firstname = userUpdated.firstname;
            user.lastname = userUpdated.lastname;
            user.email = userUpdated.email;
            user.phone = userUpdated.phone;
            user.save();
            res.status(200).send({message: "User Info updated !"});
        }
    })
    .catch(()=>{
        res.status(400).send({message: "error !"})
    })
});



module.exports = app;