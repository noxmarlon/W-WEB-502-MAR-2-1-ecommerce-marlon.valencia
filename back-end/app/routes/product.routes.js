const { authJwt } = require("../middleware");
const product = require("../controllers/product/product.controller.js");
var router = require("express").Router();
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // Create a new product
    router.post("/create",
        // [
        //     authJwt.verifyToken,
        //     authJwt.isAdmin
        // ],
        product.create);
    // Add a product to cart
    router.post("/add_to_cart",
        //  [
        //      authJwt.verifyToken,
        //      authJwt.isAdmin
        //  ],
        product.addProductToCart);
    // Add a product to order
    router.post("/add_to_order",
        //  [
        //      authJwt.verifyToken,
        //      authJwt.isAdmin
        //  ],
        product.addProductToOrder);
    // Retrieve all products
    router.get(
        "/list", product.findAll
    );
    // Retrieve a single product with id
    router.get("/list/:id", product.findOne);
    // Update a product with id
    router.put("/update/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        product.update);
    // Delete a product with id
    router.delete("/delete/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        product.delete);
    // Delete all products
    router.delete("/delete_all", 
    [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
    product.deleteAll);

    router.post("/addPicture", 
    [
        // authJwt.verifyToken,
        // authJwt.isAdmin
    ],
    product.addPicture);

    app.use('/api/product', router);
};