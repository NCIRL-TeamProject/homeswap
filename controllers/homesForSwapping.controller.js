const db = require('../database/models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const Home = db.Home;
const HomeSwapRequest = db.HomeSwapRequest;

const HomeRequestStatusEnum = { "AwaitingForApproval": 1, "Approved": 2, "Rejected": 3 };
Object.freeze(HomeRequestStatusEnum);

exports.getHomesForSwapping = (req, res) => {
    var place = req.query.place;
    var whereFilter = { published: { [Op.eq]: true } };

    if (place !== null && place !== undefined && place !== '') {
        whereFilter = {
            [Op.and]: [
                { published: { [Op.eq]: true } },
                {
                    [Op.or]: [
                        { city: { [Op.iLike]: '%' + place + '%' } },
                        { county: { [Op.iLike]: '%' + place + '%' } }
                    ]
                }
            ]
        };
    }

    Home.findAll({ where: whereFilter })
        .then((h) => {

            if (Array.isArray(h)) {
                var homes = h.map(x => ({
                    id: x.id,
                    title: x.title,
                    description: x.description,
                    bathrooms: x.bathrooms,
                    beds: x.beds,
                    bedrooms: x.bedrooms,
                    city: x.city,
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

    Home.findOne({ where: { id: homeId, published: true } })
        .then((h) => {
            if (!h) {
                return res.status(404).send({ message: "Home Not found, id: " + homeId });
            }

            res.send({
                id: h.id,
                userId: h.userId,
                title: h.title,
                description: h.description,
                streetAddress: h.streetAddress,
                city: h.city,
                county: h.county,
                country: h.country,
                streetAddress: h.streetAddress,
                postCode: h.postCode,
                bathrooms: h.bathrooms,
                bedrooms: h.bedrooms,
                beds: h.beds,
                image: h.image?.toString()
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });;
};

exports.requestHomeSwap = (req, res) => {
    const homeIdTo = req.body.homeIdTo;
    const userIdFrom = req.body.userIdFrom;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    if (!homeIdTo || !userIdFrom || !checkin || !checkout)
        return res.status(400).send({ message: "Mandatory fields not provided" });
    const pp = HomeRequestStatusEnum.AwaitingForApproval;

    HomeSwapRequest.create({
        checkin: checkin,
        checkout: checkout,
        fromUserId: userIdFrom,
        toHomeId: homeIdTo,
        status: HomeRequestStatusEnum.AwaitingForApproval
    }).then(r => {
        if (!r) {
            return res.status(500).send({ message: "Error when trying to create a HomeSwapRequest" });
        }

        res.send(r);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}