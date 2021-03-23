const controller = require("../controllers/homesForSwapping.controller");

module.exports = function (app) {
    app.route("/api/getHomesForSwapping").get(controller.getHomesForSwapping);
    app.route("/api/getHomeDetails").get(controller.getHomeDetails);
};