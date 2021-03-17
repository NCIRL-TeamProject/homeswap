const express = require('express');
const cors = require('cors');
const path = require('path');
const upload = require('./config/multer.config');
require('dotenv').config();
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(express.json({ limit: '50mb' }));

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const sequelize = new Sequelize(process.env.DATABASE_URL, config);
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


app.post('/api/homeprofile', upload.single("image"), function (req, res, next) {
    console.log("title: " + req.body.title);
    console.log("description: " + req.body.description);
    console.log("userId: " + req.body.userId);

    Home.findOne({ where: { userId: req.body.userId } }).then((h) => {

        var imageAsBase64 = undefined;

        if (req.file && req.file.buffer) {
            imageAsBase64 = "data:image/webp;base64,";
            imageAsBase64 += req.file.buffer.toString('base64');
        }

        if (!h) {
            Home.create({
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId,
                image: imageAsBase64
            }).then(r => {
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
            h.image = imageAsBase64 === null ? h.image : imageAsBase64;
            h.save();

            console.log('home updated');
            res.send('home updated');
        }

    });
});

var stream = require('stream');
const user = require('./models/user');

app.get('/api/gethomeprofile', function (req, res,) {
    const userId = req.query.userId;
    console.log("userId: " + userId);
    Home.findOne({ where: { userId: userId } }).then((h) => {
        if (!h) {
            console.log('not found');
        } else {
            const img = h.image.toString();
            res.send({ title: h.title, description: h.description, image: img });
        }

    });

});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

