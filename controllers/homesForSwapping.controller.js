const db = require('../database/models/index');
const Home = db.Home;

exports.getHomesForSwapping = (req, res) => {
    Home.findAll({ where: { published: true } })
        .then((h) => {

            if (Array.isArray(h)) {
                var homes = h.map(x => ({
                    id: x.id,
                    title: x.title,
                    description: x.description,
                    image: x.image?.toString()
                }));
                res.send(homes);
                return;
            }

            res.status(400).send({ message: "Error when trying to retrieve homes for swapping" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getHomeDetails = (req, res) => {
    const homeId = req.query.id;

    if (!homeId)
        return res.status(400).send({ message: "id not provided" });

    Home.findOne({ where: { id: homeId } })
        .then((h) => {
            if (!h) {
                return res.status(404).send({ message: "Home Not found, id: " + homeId });
            }

            res.send({
                title: h.title,
                description: h.description,
                streetAddress: h.streetAddress,
                city: h.city,
                country: h.country,
                streetAddress: h.streetAddress,
                postCode: h.postCode,
                image: h.image?.toString()
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });;
};