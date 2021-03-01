const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const { Sequelize, Model, DataTypes, } = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL); // Example for postgres
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
const User = require('./models/user')(sequelize, DataTypes);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hsapp'));

app.get('/', function (req, res) {
    console.log("/");
    res.sendFile(path.join(__dirname + '/dist/hsapp/index.html'));
});

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

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

