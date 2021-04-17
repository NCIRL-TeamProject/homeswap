const db = require('../database/models/index');
const RequestMessage = db.RequestMessage;

exports.retrieveMessages = (req, res) => {
    const requestId = req.query.requestId;
    console.log(requestId);

    if (!requestId)
        return res.status(400).send({ message: "Mandatory fields not provided: requestId" });

    //TODO: add order by
    RequestMessage.findAll({ where: { requestId: requestId }, include: ["user"] })
        .then((r) => {

            const requests = r.map(h => {
                var user = {
                    id: h.userId,
                    firstName: h.user.firstName,
                    lastName: h.user.lastName,
                    profileImage: h.user.profileImage?.toString()
                };

                return ({
                    requestId: h.requestId,
                    message: h.message,
                    userId: h.userId,
                    createdAt: h.createdAt,
                    user: user
                });
            })


            res.send(requests);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.sendMessage = (req, res) => {
    const requestId = req.body.requestId;
    const userId = req.body.userId;
    const message = req.body.message;

    if (!requestId || !userId || !message)
        return res.status(400).send({ message: "Mandatory fields not provided" });

    RequestMessage.create({
        requestId: requestId,
        userId: userId,
        message: message
    }).then(r => {
        res.send(r);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
