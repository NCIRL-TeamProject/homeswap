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

            res.send({ title: h.title, description: h.description, image: h.image?.toString() });
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
                image: imageAsBase64
            }).then(r => {
                if (!r) {
                    return res.status(500).send({ message: "Error when trying to create a home" });
                }

                res.send('home created');

            });
        } else {
            h.title = req.body.title;
            h.description = req.body.description;
            h.image = imageAsBase64 === null ? h.image : imageAsBase64;
            h.save();

            res.send('home updated');
        }

    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};