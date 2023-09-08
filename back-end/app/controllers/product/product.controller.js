const db = require("../../models");
const Product = db.product;
const Picture = db.Pictures;
const Category = db.category;
const Under_category = db.under_category;
const Cart = db.cart;
const Order = db.order;
const Op = db.Sequelize.Op;
const _ = require('lodash');

const getPagination = (page, size) => {
    const limit = size ? +size : 12;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, products, totalPages, currentPage };
};
const generate_random_name = () => {
    var now = new Date().getTime();
    var random = Math.floor(Math.random() * 100000);
    var x = new String(now + random);
    var result = x.toString();
    return result;
}
/**
* @description Create and save a new product
* @param req
* @param res
*/
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.files) {
        res.status(400).send({
            message: "Product name and files are required"
        });
        return;
    }

    const multiple = () => {
        let picture_data = [];

        //loop all files
        _.forEach(_.keysIn(req.files.photos), (key) => {
            let photo = req.files.photos[key];
            let lastIndex = photo.name.lastIndexOf('.');
            const picture_name = generate_random_name() + photo.name.slice(lastIndex);
            //push file details
            picture_data.push({
                picture: `/public/${picture_name}`
            });
        });

        return picture_data;
    }

    const oneFile = () => {
        let photo = req.files.photos;
        let lastIndex = photo.name.lastIndexOf('.');
        const picture_name = generate_random_name() + photo.name.slice(lastIndex);
        let picture_data = [{
            picture: `/public/${picture_name}`
        }]
        return picture_data;
    }

    // Create a product
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        weight: req.body.weight,
        reduction: req.body.reduction,
        status: req.body.status,
        under_category_id: req.body.under_category_id,
        pictures: (!req.files.photos.name ? multiple() : oneFile())
    };

    // Save product in the database
    Product.create(product, {
        include: [{
            association: Picture,
            as: 'pictures'
        }]
    })
        .then(data => {
            data.pictures.forEach((item, key) => {
                //move photo to uploads directory
                let photo = req.files.photos[key];
                photo.mv(`.${item.picture}`);
            })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
            return;
        });
};
/**
* @description Retrieve all products from the database
* @param req
* @param res
*/
exports.findAll = async (req, res) => {
    const { page, size, name } = req.query;
    const { limit, offset } = getPagination(page, size);
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    await Product.findAndCountAll({
        where: condition, limit, offset, include: ["references", "pictures", {model: Under_category, as: "under_categories", include: [{model: Category, as: "categories"}]}], distinct: true // ["under_categories", "references", "pictures"]
        
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};
/**
* @description Find a single product with an id
* @param req
* @param res
*/
exports.findOne = async (req, res) => {
    const id = req.params.id;
    // Product.findByPk(id)
    await Product.findByPk(id, {
        include: ["references", "pictures", {model: Under_category, as: "under_categories", include: [{model: Category, as: "categories"}]}], distinct: true
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
};
/**
* @description Update a product by the id in the request
* @param req
* @param res
*/
exports.update = (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Product id are required"
        });
        return;
    }

    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product with id=" + id
            });
        });
};
/**
* @description Delete a product with the specified id in the request
* @param req
* @param res
*/
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete product with id=${id}. Maybe product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};
/**
* @description Delete all products from the database
* @param req
* @param res
*/
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        });
};

/**
* @description Add a product to a category
* @param req
* @param res
*/
// exports.addProduct = async (req, res) => {
//     const productId = req.body.productId;
//     const categoryId = req.body.categoryId;
//     await Category.findByPk(categoryId)
//         .then((category) => {
//             if (!category) {
//                 res.send({
//                     message: "Category not found."
//                 })
//                 return;
//             }
//             Product.findByPk(productId)
//                 .then((product) => {
//                     if (!product) {
//                         res.send({
//                             message: "Product not found."
//                         })
//                         return;
//                     }
//                     category.addProduct(product);
//                     res.send({
//                         message: `Added Product id=${product.id} to Categroy id=${category.id}`
//                     })
//                 })
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: "Some error occurred while adding product to category."
//             });
//         });
// };

/**
* @description Add a product to cart
* @param req
* @param res
*/
exports.addProductToCart = async (req, res) => {
    const productId = req.body.productId;

    const infos = {
        quantity: req.body.quantity,
    };

    try {
        await Order.findOne({
            where: {
                userId: userId
            }
        })
            .then((order) => {
                if (!order) {
                    Order.create(infos)
                        .then((order) => {
                            res.send(order);
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating cart.(PC)"
                            });
                        });
                }
                Product.findByPk(productId)
                    .then((product) => {
                        if (!product) {
                            // res.send({
                            //     message: "Product not found."
                            // })
                            throw "Product not found."
                            // return;
                        }
                        order.addProduct(product);
                        res.send({
                            message: `Successfully added Product id=${product.id} to Cart id=${order.id}`
                        })
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occurred while adding product to cart. I"
                        });
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Some error occurred while adding product to cart. II"
                });
            });
    } catch (error) {
        res.send(message)
    }
};

/**
* @description Add a product to order
* @param req
* @param res
*/
exports.addProductToOrder = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;

    const infos = {
        status: "in_progress",
        price: 0,
        gift: "none",
        userId: userId
    };

    try {
        await Order.findOne({
            where: {
                userId: userId
            }
        })
            .then((order) => {
                if (!order) {
                    Order.create(infos)
                        .then((order) => {
                            res.send(order);
                        })
                        .catch((err) => {
                            res.status(500).send({
                                messqge: err.message || "Some error occurred while creating order.(PC)"
                            });
                        });
                }
                // res.send(order);
                Product.findByPk(productId)
                    .then((product) => {
                        if (!product) {
                            // res.send({
                            //     message: "Product not found."
                            // })
                            throw "Product not found."
                            // return;
                        }
                        order.addProduct(product);
                        res.send({
                            message: `Successfully added Product id=${product.id} to Order id=${order.id}`
                        })
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occurred while adding product to order. I"
                        });
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Some error occurred while adding product to order. II"
                });
            });
    } catch (error) {
        res.send(message)
    }
};

/**
* @description Add a product to a category
* @param req
* @param res
*/
exports.addPicture = (req, res) => {
    const id = req.body.id;
    if (!req.files) {
        res.send({
            status: false,
            message: "No file uploaded"
        });
        return;
    }

    Product.findByPk(id).then((product) => {
        if (!product) {
            res.send({
                message: "Product not found."
            })
            return;
        }

        const multiple = () => {
            let picture_data = [];

            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];
                let lastIndex = photo.name.lastIndexOf('.');
                const picture_name = generate_random_name() + photo.name.slice(lastIndex);
                //push file details
                picture_data.push({
                    product_id: id,
                    picture: `/public/${picture_name}`
                });
            });

            return picture_data;
        }

        const oneFile = () => {
            let photo = req.files.photos;
            let lastIndex = photo.name.lastIndexOf('.');
            const picture_name = generate_random_name() + photo.name.slice(lastIndex);
            let picture_data = [{
                product_id: id,
                picture: `/public/${picture_name}`
            }]
            return picture_data;
        }

        const pictures = (!req.files.photos.name ? multiple() : oneFile())

        pictures.forEach((item) => {
            Product_picture.create(item)
                .then(data => {
                    if (!req.files.photos.name) {
                        data.forEach((item, key) => {
                            //move photo to uploads directory
                            let photo = req.files.photos[key];
                            photo.mv(`.${item.picture}`);
                        })
                    } else {
                        let photo = req.files.photos;
                        photo.mv(`.${item.picture}`);
                    }
                    // res.send(data);
                })
            // .catch(err => {
            //     res.status(500).send({
            //         message:
            //             err.message || "Some error occurred while creating the picture."
            //     });
            //     return;
            // });
        })
        res.send({
            message: `>> added picture to Product id=${id}`
        })
        return;
    });

};

/**
* @description Add a product to order
* @param req
* @param res
*/
exports.addProductToOrder = async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;

    const infos = {
        status: "in_progress",
        price: 0,
        gift: "none",
        userId: userId
    };

    try {
        await Order.findOne({
            where: {
                userId: userId
            }
        })
            .then((order) => {
                if (!order) {
                    Order.create(infos)
                        .then((order) => {
                            res.send(order);
                        })
                        .catch((err) => {
                            res.status(500).send({
                                messqge: err.message || "Some error occurred while creating order.(PC)"
                            });
                        });
                }
                // res.send(order);
                Product.findByPk(productId)
                    .then((product) => {
                        if (!product) {
                            // res.send({
                            //     message: "Product not found."
                            // })
                            throw "Product not found."
                            // return;
                        }
                        order.addProduct(product);
                        res.send({
                            message: `Successfully added Product id=${product.id} to Order id=${order.id}`
                        })
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occurred while adding product to order. I"
                        });
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Some error occurred while adding product to order. II"
                });
            });
    } catch (error) {
        res.send(message)
    }
};

