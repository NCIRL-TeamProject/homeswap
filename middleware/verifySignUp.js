const db = require("../database/models");
const User = db.User;

checkDuplicatedUserEmail = (req, res, next) => {

    if (!req.body.email)
        return res.status(400).send({ message: "Mandatory fields not provided" });

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
    checkDuplicatedUserEmail: checkDuplicatedUserEmail
};

module.exports = verifySignUp;