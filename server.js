const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const gmapsKeyEndpoint = require("./gmapsKeyEndpoint");
const db = require(__dirname + '/database/models/index');
const sequelize = db.sequelize;

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(express.json({ limit: '50mb' }));

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hsapp'));

app.get('/', function (req, res) {
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
    sequelize.query('SELECT * FROM public."Users"', { type: sequelize.QueryTypes.SELECT })
        .then(function (users) {
            res.send(users);
        })
});

app.get('/test2', function (req, res) {
    //Example sequelize: query from model
    db.User.findAll().then(function (users) {
        res.send(users);
    });
});

app.get('/test3', function (req, res) {
    //Example sequelize: query from model
    db.Home.findAll().then(function (homes) {
        res.send(homes);
    });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/homeProfile.routes')(app);
require('./routes/homesForSwapping.routes')(app);


app.get('/gm/getKey', function (req, res) {
    res.send({ key: process.env.GMAPS_API_KEY });
});
// gmapsKeyEndpoint.initialize(app);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);