const db = require("../database/models");
const config = require("../config/auth.config");
const User = db.User;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

exports.signup = (req, res) => {

    if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        dbo: req.body.dbo
    })
        .then(user => {
            res.send({ message: "User was registered successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {

    if (!(req.body.email && req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({
        where: {
            email: { [Op.iLike]: req.body.email }
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.send({
                id: user.id,
                username: user.firstName + " " + user.lastName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImage: user.profileImage?.toString(),
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};