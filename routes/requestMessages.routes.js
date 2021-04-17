const controller = require("../controllers/requestMessages.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.get("/api/requestMessages/retrieve", [authJwt.verifyToken], controller.retrieveMessages);
    app.post("/api/requestMessages/send", [authJwt.verifyToken], controller.sendMessage);
};