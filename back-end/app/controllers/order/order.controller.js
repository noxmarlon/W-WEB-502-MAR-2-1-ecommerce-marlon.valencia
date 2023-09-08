const db = require("../../models");
const Order = db.order;
const Product = db.product;
const Op = db.Sequelize.Op;
/**
* @description Create and save a new order
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
    // Create an order
    const order = {
        status: "in_progress",
        price: 100,
        gift: "none",
        userId: req.body.userId
    };
    // Save order in the database
    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while creating the order.(OC)"
            });
        });
};
/**
* @description Retrieve all orders from the database
* @param req
* @param res
*/
exports.findAll = (req, res) => {
    Order.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
};
/**
* @description Find a single order with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const id = req.params.id;
    Order.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find order with id=${id}.`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving order with id=" + id
            });
        });
};
/**
* @description Update an order by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "0rder was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating order with id=" + id
            });
        });
};
/**
* @description Delete a order with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Order.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete order with id=${id}. Maybe order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete order with id=" + id
            });
        });
};
/**
* @description Delete all orders from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} orders were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while removing all orders."
            });
        });
};