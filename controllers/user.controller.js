const db = require('../database/models/index');
const User = db.User;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

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
                 dbo: u.dbo
             });
         })
         .catch(err => {
             console.log(err.message);
             res.status(500).send({ message: err.message });
         });
};