const db = require('../database/models/index');
const Home = db.Home;

exports.getHomeProfile = (req, res) => {
    const userId = req.query.userId;

    if (!userId)
        return res.status(400).send({ message: "Home Not found." });

    Home.findOne({ where: { userId: userId } })
        .then((h) => {
            if (!h) {
                return res.status(404).send({ message: "Home Not found." });
            }

            res.send({
                id: h.id,
                title: h.title,
                description: h.description,
                streetAddress: h.streetAddress,
                city: h.city,
                postCode: h.postCode,
                county: h.county,
                country: h.country,
                userId: h.userId,
                bathrooms: h.bathrooms,
                bedrooms: h.bedrooms,
                beds: h.beds,
                published: h.published,
                image: h.image?.toString()
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });;
};

exports.updateHomeProfile = (req, res) => {
    if (!(req.body.title && req.body.description && req.body.userId)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    Home.findOne({ where: { userId: req.body.userId } }).then((h) => {

        var imageAsBase64 = undefined;

        if (req.file?.buffer) {
            imageAsBase64 = "data:image/webp;base64,";
            imageAsBase64 += req.file.buffer.toString('base64');
        }

        if (!h) {
            Home.create({
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                postCode: req.body.postCode,
                county: req.body.county,
                bathrooms: req.body.bathrooms,
                bedrooms: req.body.bedrooms,
                beds: req.body.beds,
                country: req.body.country,
                image: imageAsBase64,
                published: false
            }).then(r => {
                if (!r) {
                    return res.status(500).send({ message: "Error when trying to create a home" });
                }

                res.send(r);
            });
        } else {
            h.id;
            h.title = req.body.title;
            h.description = req.body.description;
            h.streetAddress = req.body.streetAddress;
            h.city = req.body.city;
            h.postCode = req.body.postCode;
            h.county = req.body.county;
            // h.country = req.body.country;
            h.bathrooms = req.body.bathrooms;
            h.bedrooms = req.body.bedrooms;
            h.beds = req.body.beds;
            h.image = imageAsBase64 === null ? h.image : imageAsBase64;
            h.save();

            res.send(h);
        }
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.setPublished = (req, res) => {
    if (!(req.body.homeId && req.body.published !== undefined)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    Home.findOne({ where: { id: req.body.homeId } }).then((h) => {

        if (!h) {
            return res.status(500).send({ message: "Error when trying publish/unpublish a home profile" });
        }
        else {
            h.published = req.body.published;
            h.save();

            res.send({ published: req.body.published });
        }
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};