const db = require('../database/models/index');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const Home = db.Home;
const User = db.User;
const HomeSwapRequest = db.HomeSwapRequest;

const HomeRequestStatusEnum = { "AwaitingForApproval": 1, "Approved": 2, "Rejected": 3 };
Object.freeze(HomeRequestStatusEnum);

exports.getHomesForSwapping = (req, res) => {
    let offset = parseInt(req.query.offset) || 0;
    let size = parseInt(req.query.limit) || Users.length;
    let from = offset * size;
    let to = from + size;
    var place = req.query.place;
    var userId = req.query.userId ? parseInt(req.query.userId) : -1;
    var whereFilter = { published: { [Op.eq]: true }, userId: { [Op.ne]: userId } };

    console.log(userId)
    if (place !== null && place !== undefined && place !== '') {
        whereFilter = {
            [Op.and]: [
                { published: { [Op.eq]: true } },
                {
                    [Op.or]: [
                        { city: { [Op.iLike]: '%' + place + '%' } },
                        { county: { [Op.iLike]: '%' + place + '%' } }
                    ]
                },
                {
                    userId: { [Op.ne]: userId }
                }
            ]
        };
    }

    Home.findAll({ where: whereFilter, order: [['updatedAt', 'DESC']] })
        .then((h) => {

            homesBeforeMap = h.slice(from, to);
            var homes = homesBeforeMap.map(x => ({
                id: x.id,
                title: x.title,
                description: x.description,
                bathrooms: x.bathrooms,
                beds: x.beds,
                bedrooms: x.bedrooms,
                city: x.city,
                image: x.image?.toString()
            }));
            res.send({ homes: homes, total: h.length });
            return;



        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getHomeDetails = (req, res) => {
    const homeId = req.query.id;

    if (!homeId)
        return res.status(400).send({ message: "homeId not provided" });

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

exports.validateHomeIsPublished = (req, res) => {
    const userId = req.query.userId;

    if (!userId)
        return res.status(400).send({ message: "userId not provided" });

    Home.findOne({ where: { userId: userId } })
        .then((h) => {
            if (!h) {
                return res.status(404).send({ message: "Home not found, id: " + userId });
            }

            res.send({
                id: h.id,
                published: h.published
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });;
}

exports.requestHomeSwap = (req, res) => {
    const homeIdTo = req.body.homeIdTo;
    const userIdFrom = req.body.userIdFrom;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;

    if (!homeIdTo || !userIdFrom || !checkin || !checkout)
        return res.status(400).send({ message: "Mandatory fields not provided" });

    Home.findOne({ where: { userId: userIdFrom } })
        .then((homeFrom) => {

            Home.findOne({ where: { id: homeIdTo } })
                .then((homeTo) => {

                    HomeSwapRequest.create({
                        checkin: checkin,
                        checkout: checkout,
                        fromUserId: userIdFrom,
                        fromHomeId: homeFrom.id,
                        toHomeId: homeIdTo,
                        toUserId: homeTo.userId,
                        status: HomeRequestStatusEnum.AwaitingForApproval
                    }).then(r => {
                        res.send(r);
                    }).catch(err => {
                        res.status(500).send({ message: err.message });
                    });

                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.receivedRequests = (req, res) => {
    const userId = req.query.userId;

    if (!userId)
        return res.status(400).send({ message: "userId not provided" });

    HomeSwapRequest.findAll({ where: { toUserId: userId }, include: ["fromUser", "fromHome"] })
        .then((h) => {
            var requests = h.map(x => {
                var user = {
                    id: x.fromUser.id,
                    firstName: x.fromUser.firstName,
                    profileImage: x.fromUser.profileImage?.toString()
                };

                return ({
                    id: x.id,
                    createdAt: x.createdAt,
                    checkin: x.checkin,
                    checkout: x.checkout,
                    fromUserId: x.fromUserId,
                    fromHomeId: x.fromHomeId,
                    toUserId: x.toUserId,
                    toHomeId: x.toHomeId,
                    status: x.status,
                    fromUser: user,
                    fromHome: x.fromHome
                })
            }
            );
            res.send(requests);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.sentRequests = (req, res) => {
    const userId = req.query.userId;

    if (!userId)
        return res.status(400).send({ message: "userId not provided" });

    HomeSwapRequest.findAll({ where: { fromUserId: userId }, include: ["toUser", "toHome"] })
        .then((h) => {
            var requests = h.map(x => {
                var user = {
                    id: x.toUser.id,
                    firstName: x.toUser.firstName,
                    profileImage: x.toUser.profileImage?.toString()
                };

                return ({
                    id: x.id,
                    createdAt: x.createdAt,
                    checkin: x.checkin,
                    checkout: x.checkout,
                    fromUserId: x.fromUserId,
                    fromHomeId: x.fromHomeId,
                    toUserId: x.toUserId,
                    toHomeId: x.toHomeId,
                    status: x.status,
                    toUser: user,
                    toHome: x.toHome
                })
            });
            res.send(requests);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}