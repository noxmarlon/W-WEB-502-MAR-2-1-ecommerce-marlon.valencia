const db = require("../../models");
const Cart = db.cart;
const Product = db.product;
const Op = db.Sequelize.Op;
/**
* @description Create and save a new cart
* @param req
* @param res
*/
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.status) {
    //     res.status(400).send({
    //         message: "Status can not be empty!!"
    //     });
    //     return;
    // }
    // Create an cart
    const cart = {
        quantity: req.body.quantity
    };
    // Save cart in the database
    Cart.create(cart)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while creating the cart.(OC)"
            });
        });
};
/**
* @description Retrieve all carts from the database
* @param req
* @param res
*/
exports.findAll = (req, res) => {
    Cart.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carts."
            });
        });
};
/**
* @description Find a single cart with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cart.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find cart with id=${id}.`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving cart with id=" + id
            });
        });
};
/**
* @description Update an cart by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Cart.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cart was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update cart with id=${id}. Maybe cart was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating cart with id=" + id
            });
        });
};
/**
* @description Delete a cart with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Cart.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cart was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete cart with id=${id}. Maybe cart was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete cart with id=" + id
            });
        });
};
/**
* @description Delete all carts from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Cart.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} carts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while removing all carts."
            });
        });
};