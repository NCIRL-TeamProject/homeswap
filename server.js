const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
const User = require('./models/user')(sequelize, DataTypes);
const Home = require('./models/home')(sequelize, DataTypes);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hsapp'));

app.get('/', function (req, res) {
    console.log("/");
    res.sendFile(path.join(__dirname + '/dist/hsapp/index.html'));
});

//TODO: At some point we have to move endpoints to services
app.get('/test', function (req, res) {

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        res.send("connected");
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect");
    });

});

app.get('/test1', function (req, res) {
    //Example sequelize: raw query
    sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT })
        .then(function (users) {
            res.send(users);
        })
});

app.get('/test2', function (req, res) {
    //Example sequelize: query from model
    User.findAll().then(function (users) {
        res.send(users);
    });
});

//x-www-form-urlencoded content type
// app.post('/api/homeprofile', function (req, res) {
//form / multipart
app.post('/api/homeprofile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.body);
    console.log("title: " + req.body.title);
    console.log("description: " + req.body.description);
    console.log("userId: " + req.body.userId);


    Home.findOne({ where: { userId: req.body.userId } }).then((h) => {
        if (!h) {
            Home.create({ title: req.body.title, description: req.body.description, userId: req.body.userId }).then(r => {
                if (r) {
                    console.log('home created');
                    res.send('home created');
                }
                else {
                    console.log('home not created');
                    res.send('home not created');
                }
            });
        } else {
            h.title = req.body.title;
            h.description = req.body.description;
            h.save();

            console.log('home updated');
            res.send('home updated');
        }

    });
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

