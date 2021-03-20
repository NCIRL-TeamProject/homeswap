const { authJwt } = require("../middleware");
const controller = require("../controllers/homeProfile.controller");
const upload = require('../config/multer.config');

module.exports = function (app) {
    app.route("/api/homeProfile")
        .get([authJwt.verifyToken], controller.getHomeProfile)
        .post([authJwt.verifyToken], upload.single("image"), controller.updateHomeProfile);
};