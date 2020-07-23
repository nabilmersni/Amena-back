/*
const jwt = require('jsonwebtoken');

let isAdmin = function(req,res,next){

    try {

        let token = req.header('Authorisation');

        let decodedtoken = jwt.verify(token, "myKey");

        if(decodedtoken.role =="admin"){
            next();
        }else{
            res.status(401).send({message: "not author.. !"})
        }

    } catch (error) {
        res.status(403).send({message: "forbiden"})
    }
}

module.exports = isAdmin;
*/