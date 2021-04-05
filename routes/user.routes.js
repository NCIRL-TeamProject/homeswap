const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.get("/api/users/profile/:id", [authJwt.verifyToken], controller.userBasicDetails)
    app.post("/api/user/delete/:id", [authJwt.verifyToken], controller.accountRemove)
};