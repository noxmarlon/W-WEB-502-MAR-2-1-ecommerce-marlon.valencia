const { authJwt } = require("../middleware");
const category = require("../controllers/category/category.controller.js");
var router = require("express").Router();
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Create a new category
    router.post("/create", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    category.create);
    // Retrieve all categorys
    router.get(
        "/list",
        // authJwt.verifyToken,
        category.findAll
    );
    // Retrieve a single category with id
    router.get("/list/:id", category.findOne);
    // Update a category with id
    router.put("/update/:id", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    category.update);
    // Delete a category with id
    router.delete("/delete/:id", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    category.delete);
    // Delete all categorys
    router.delete("/delete_all", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    category.deleteAll);
    app.use('/api/category', router);
};