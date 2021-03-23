const controller = require("../controllers/homesForSwapping.controller");

module.exports = function (app) {
    app.route("/api/getHomesForSwapping")
        .get(controller.getHomesForSwapping);
};