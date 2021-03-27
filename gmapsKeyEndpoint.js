require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

exports.initialize = (app) => {
    //For test purpose only (dev environment only)
    if (process.env.NODE_ENV !== 'production' || process.env.GMAPS_TEST) {
        app.get('/getKey', function (req, res) {
            axios.get('http://localhost:5001/getKey')
                .then(response => {
                    res.send(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    const appForGmapsKeyEndpoint = express();


    var corsOptions = {
        // origin: true,
        allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,X-Skip-Interceptor",
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    appForGmapsKeyEndpoint.use(cors(corsOptions));


    // appForGmapsKeyEndpoint.use(function (req, res, next) { //allow cross origin requests
    //     res.setHeader("Access-Control-Allow-Methods", "GET");
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Skip-Interceptor");
    //     res.header("Access-Control-Allow-Credentials", true);
    //     next();
    // });

    // var corsOptions = {
    //     origin: true,
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,X-Skip-Interceptor",
    //     preflightContinue: false,
    //     optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
    // }


    appForGmapsKeyEndpoint.get('/getKey', function (req, res) {
        res.send({ key: process.env.GMAPS_API_KEY });
    });

    appForGmapsKeyEndpoint.listen(5001, 'localhost');
};