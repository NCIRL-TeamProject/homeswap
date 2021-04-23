const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const upload = require('../config/multer.config');

module.exports = function (app) {
    app.get("/api/users/profile/:id", [authJwt.verifyToken], controller.userBasicDetails)
    app.post("/api/user/delete/:id", [authJwt.verifyToken], controller.accountRemove) // to refactor to delete instead
    app.put("/api/user/update/:id", [authJwt.verifyToken], controller.accountUpdateBasicDetails)
    app.put("/api/user/update/password/:id", [authJwt.verifyToken], controller.accountUpdatePassword)
    app.put("/api/user/update/picture/:id", [authJwt.verifyToken], upload.single("profileImage"), controller.accountUpdateProfilePicture)
};