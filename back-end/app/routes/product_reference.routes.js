const { authJwt } = require("../middleware");
const product_reference = require("../controllers/product/product_reference.controller.js");
var router = require("express").Router();
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Create a new product_reference
    router.post("/create", 
    // [
    //     authJwt.verifyToken,
    //     authJwt.isAdmin
    // ],
    product_reference.create);
    // Retrieve all product_references
    router.get("/list",
        // authJwt.verifyToken,
        product_reference.findAll
    );
    // Retrieve a single product_reference with id
    router.get("/list/:id", product_reference.findOne);
    // Update a product_reference with id
    router.put("/update/:id", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    product_reference.update);
    // Delete a product_reference with id
    router.delete("/delete/:id", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    product_reference.delete);
    // Delete all product_references
    router.delete("/delete_all", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    product_reference.deleteAll);
    app.use('/api/product_reference', router);
};