const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.post("/api/auth/signup",
        [verifySignUp.checkDuplicatedUserEmail],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
};