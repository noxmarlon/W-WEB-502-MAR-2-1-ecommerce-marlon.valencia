const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth/auth.controller.js");
var router = require("express").Router();
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Signup
    router.post(
        "/signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    // Login
    router.post("/login", controller.signin);
    // Logout
    router.post(
        "/logout",
        authJwt.verifyToken,
        controller.logout);
    // Refresh access-token
    router.post("/refresh", controller.refreshToken);
    app.use('/api/auth', router);
};