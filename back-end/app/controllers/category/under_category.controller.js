const db = require("../../models");
const Under_under_category = db.under_under_category;
const Product = db.product;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: categories } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, categories, totalPages, currentPage };
};
/**
* @description Create and save a new under_category
* @param req
* @param res
*/
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!!"
        });
        return;
    }
    // Create a under_category
    const product = {
        name: req.body.name,
        category_id: req.body.category_id
    };
    // Save under_category in the database
    Under_under_category.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the under_category."
            });
        });
};
/**
* @description Retrieve all categories from the database
* @param req
* @param res
*/
exports.findAll = async (req, res) => {
    const { page, size, under_category , product} = req.query;
    const { limit, offset } = getPagination(page, size);
    var condition = under_category ? { name: { [Op.like]: `%${under_category}%` } } : null;
    var condition2 = product ? { name: { [Op.like]: `%${product}%` } } : null;
    await Under_under_category.findAndCountAll({
        where: condition, limit, offset, include: [{model: Product, as: "products", where: condition2}], distinct: true
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};
/**
* @description Find a single under_category with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const productName = req.query;
    const id = req.params.id;
    // var condition2 = productName ? { name: { [Op.like]: `%${productName}%` } } : null;
    Under_under_category.findByPk(id, {
        // include: [{model: Product, as: "products", where: condition2}]
        include: ["products"]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find under_category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving under_category with id=" + id
            });
        });
};
/**
* @description Update a under_category by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Under_under_category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "under_category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update under_category with id=${id}. Maybe under_category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating under_category with id=" + id
            });
        });
};
/**
* @description Delete a under_category with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Under_under_category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "under_category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete under_category with id=${id}. Maybe under_category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete under_category with id=" + id
            });
        });
};
/**
* @description Delete all categories from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Under_under_category.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        });
};