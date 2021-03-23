const db = require('../database/models/index');
const Home = db.Home;

exports.getHomesForSwapping = (req, res) => {
    Home.findAll({ where: { published: true } })
        .then((h) => {

            if (Array.isArray(h)) {
                var homes = h.map(x => ({ title: x.title, description: x.description, image: x.image?.toString() }));
                res.send(homes);
                return;
            }

            res.status(400).send({ message: "Error when trying to retrieve homes for swapping" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
