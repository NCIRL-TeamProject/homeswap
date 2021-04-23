const db = require('../database/models/index');
var bcrypt = require("bcryptjs");
const User = db.User;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");

// CRUD user account

exports.userBasicDetails = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User Not found." });
    }
    User.findOne({ where: { id: userId } })
        .then((u) => {
            if (!u) {
                return res.status(404).send({ message: "User Not found." });
            }
            res.send({
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                dbo: u.dbo,
                joinedIn: u.createdAt,
                profileImage: u.profileImage?.toString()
            });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({ message: err.message });
        });
};

exports.accountRemove = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User Not found." });
    }
    if (!(req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({
        where: {
            email: req.body.email
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

            User.destroy({
                where: {
                    id: userId
                }
            })
                .then(() => {
                    res.send({ message: "User was removed successfully" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.accountUpdateBasicDetails = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User Not found." });
    }
    if (!(req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({
        where: {
            email: req.body.email
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
            User.update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dbo: req.body.dbo
                },
                {
                    where: {
                        id: userId
                    }
                }
            )
                .then(() => {
                    res.send({ message: "User was updated successfully" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.accountUpdatePassword = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "User Not found." });
    }
    if (!(req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({
        where: {
            id: userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            User.update(
                {
                    password: bcrypt.hashSync(req.body.password, 8)
                },
                {
                    where: {
                        id: userId
                    }
                }
            )
                .then(() => {
                    res.send({ message: "Password was updated successfully" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.accountUpdateProfilePicture = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({ where: { id: userId } }).then((user) => {

        var imageAsBase64 = undefined;
        if (req.file?.buffer) {
            imageAsBase64 = "data:image/webp;base64,";
            imageAsBase64 += req.file.buffer.toString('base64');
        }
        if (user) {
            User.update(
                {
                    profileImage: imageAsBase64
                },
                {
                    where: {
                        id: userId
                    }
                }
            ).then(r => {
                if (!r) {
                    return res.status(500).send({ message: "Error when trying to update user profile picture" });
                }
                res.send({ message: "Profile picture was updated successfully" });
            });
        } else {
            return res.status(400).send({ message: "User Not found." });
        }
    })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};