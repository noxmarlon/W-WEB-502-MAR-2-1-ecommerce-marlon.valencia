module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        size: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.STRING
        },
        reduction: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('on_stock', 'out_of_stock')
        }
    });
    return Product;
};