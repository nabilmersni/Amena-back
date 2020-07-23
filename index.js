const express = require('express');
//pour assurer que les données eli bch yjiw raw fi format mou3ayna
const bodyParser = require('body-parser');
//pour indiquer la base de donnée eli bch yekhdm aliha

const Post = require('./models/post');
const User = require('./models/user');

const fs = require('fs');

const cors = require('cors');

const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');



const app = express();

//connect-multiparty OU multer
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public' });

//make public DIR accessible 
app.use(express.static('public')); //Accept Files
app.use(bodyParser.urlencoded({ extended: true }));


//el format heya JSON
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);
app.use('/admin', adminController);


app.post('/post/add', multipartMiddleware, (req, res) => {

    let data = JSON.parse(req.body.data);
    //let data = req.body;
    console.log(data);


    if (req.files) {

        let path = req.files.image.path;
        const ext = path.substr(path.indexOf('.'));
        const newName = "test";
        fs.renameSync(path, "public/" + newName + ext);


        //2 - creation d'un object <= data
        let post = new Post({
            title: data._title,
            userId: data._userId,
            amount: data._amount,
            type: data._type,
            description: data._description,
            follower: null,
            donors: null,
            image: newName + ext,
        });

        
        post.save()
        .then(() => {
            res.status(200).send({ message: "post added succefully !" });
        })
        .catch((e) => {
            res.status(400).send(e);
        });
    }




});

app.patch('/update/:idUser', multipartMiddleware, (req, res) => {

    let data = JSON.parse(req.body.data);
    let id = req.params.idUser;

    if (req.files) {

        let path = req.files.image.path;
        const ext = path.substr(path.indexOf('.'));
        const newName = id;
        fs.renameSync(path, "public/" + newName + ext);


        //2 - creation d'un object <= data
        let userUpdated = new User({
            fullname: data._fullname,
            username: data._username,
            email: data._email,
            phone: data._phone,
            image: newName + ext
        });

        User.findOne({_id: id })
            .then((user) => {
                if (!user) {
                    res.status(400).send({ message: "user not found !" })
                } else {
                    user.fullname = userUpdated.fullname;
                    user.username = userUpdated.username;
                    user.email = userUpdated.email;
                    user.phone = userUpdated.phone;
                    user.image = userUpdated.image;
                    user.save();
                    res.status(200).send({ message: "User Info updated !" });
                }
            })
            .catch(() => {
                res.status(400).send({ message: "error !" })
            })
    }

});




let port = process.env.PORT || 3000
app.listen(port, () => console.log("server started"))