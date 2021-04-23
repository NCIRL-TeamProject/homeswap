const controller = require("../controllers/homesForSwapping.controller");

module.exports = function (app) {
    app.route("/api/getHomesForSwapping").get(controller.getHomesForSwapping);
    app.route("/api/getHomeDetails").get(controller.getHomeDetails);
    app.route("/api/requestHomeSwap").post(controller.requestHomeSwap);
    app.route("/api/validateHomeIsPublished").get(controller.validateHomeIsPublished);
    app.route("/api/receivedRequests").get(controller.receivedRequests);
    app.route("/api/sentRequests").get(controller.sentRequests);
    app.route("/api/approveRequest").post(controller.approveRequest);
    app.route("/api/rejectRequest").post(controller.rejectRequest);
}