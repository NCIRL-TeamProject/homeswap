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

    appForGmapsKeyEndpoint.get('/getKey', cors(), function (req, res) {
        res.send({ key: process.env.GMAPS_API_KEY });
    });

    appForGmapsKeyEndpoint.listen(5001, 'localhost');
};