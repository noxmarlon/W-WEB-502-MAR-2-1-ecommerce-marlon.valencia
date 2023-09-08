const db = require("../../models");
const Sequelize = require("sequelize");
const Category = db.category;
const Under_category = db.under_category;
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
* @description Create and save a new category
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
    // Create a category
    const product = {
        name: req.body.name
    };
    // Save category in the database
    Category.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};
/**
* @description Retrieve all categories from the database
* @param req
* @param res
*/
exports.findAll = async (req, res) => {
    const { page, size, category, under_category, product } = req.query;
    const { limit, offset } = getPagination(page, size);
    var condition = category ? { name: { [Op.like]: `%${category}%` } } : null;
    var condition2 = under_category ? { name: { [Op.like]: `%${under_category}%` } } : null;
    var condition3 = product ? { name: { [Op.like]: `%${product}%` } } : null;
    await Category.findAndCountAll({
        where: condition, limit, offset,
        include: [{
            model: Under_category, as: "under_categories", where: condition2, include:
                [{
                    model: Product, as: "products", where: condition3, include: ["pictures"]
                }]
        }],
        
        distinct: true
    })
        .then(data => {
            var count = 0;
            for (cat of data.rows) {
                for (undercat of cat.under_categories) {
                    count = count + undercat.products.length;
                }
            }
            data.count = count;
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
* @description Find a single category with an id
* @param req
* @param res
*/
exports.findOne = (req, res) => {
    const productName = req.query;
    const id = req.params.id;
    // var condition2 = productName ? { name: { [Op.like]: `%${productName}%` } } : null;
    Category.findByPk(id, {
        // include: [{model: Product, as: "products", where: condition2}]
        include: ["products"]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving category with id=" + id
            });
        });
};
/**
* @description Update a category by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;
    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update category with id=${id}. Maybe category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating category with id=" + id
            });
        });
};
/**
* @description Delete a category with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete category with id=${id}. Maybe category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete category with id=" + id
            });
        });
};
/**
* @description Delete all categories from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Category.destroy({
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