const { authJwt } = require("../middleware");
const controller = require("../controllers/user/user.controller.js");
var router = require("express").Router();
module.exports = function (app) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Test user private content with JWT auth
    router.get(
        "/user",
        authJwt.verifyToken,
        controller.userBoard
    );
    // Test admin private content with JWT auth
    router.get(
        "/admin",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.adminBoard
    );
    // Test admin role
    router.get(
        "/testrole",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.adminBoard
    );
    app.use('/api', router);
};
