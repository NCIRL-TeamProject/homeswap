//Source: https://bezkoder.com/node-js-jwt-authentication-postgresql/
const db = require("../models");
const User = db.User;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed: Email is already in use"
            });
            return;
        }

        next();
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;