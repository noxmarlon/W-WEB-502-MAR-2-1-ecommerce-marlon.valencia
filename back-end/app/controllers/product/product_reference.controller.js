const { product_reference } = require("../../models");
const db = require("../../models");
const Product_reference = db.product_reference;
const Product = db.product;
const Op = db.Sequelize.Op;
/**
* @description Create and save a new product_reference
* @param req
* @param res
*/
exports.create = (req, res) => {
    // Validate request
    if (!req.body.stock) {
        res.status(400).send({
            message: "Content can not be empty!!"
        });
        return;
    }
    // Create a product
    const product_reference = {
        color: req.body.color,
        stock: req.body.stock,
        productId: req.body.productId
    };
    // Save product in the database
    Product_reference.create(product_reference)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while creating the product_reference. Verify that productId matches a product*"
            });
        });
};
/**
* @description Retrieve all product_references from the database
* @param req
* @param res
*/
exports.findAll = (req, res) => {
    Product_reference.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product_references."
            });
        });
};
/**
* @description Find a single product_reference with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product_reference.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find product_reference with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product_reference with id=" + id
            });
        });
};
/**
* @description Update a product_reference by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Product_reference.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product_reference was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product_reference with id=${id}. Maybe product_reference was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product_reference with id=" + id
            });
        });
};
/**
* @description Delete a product_reference with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Product_reference.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product_reference was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete product_reference with id=${id}. Maybe product_reference was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete product_reference with id=" + id
            });
        });
};
/**
* @description Delete all product_references from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Product_reference.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Product_references were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all product_references."
            });
        });
};