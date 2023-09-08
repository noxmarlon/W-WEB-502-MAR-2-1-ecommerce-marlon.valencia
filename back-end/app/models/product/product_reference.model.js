module.exports = (sequelize, Sequelize) => {
    const Product_reference = sequelize.define("product_references", {
        color: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        }
    });
    return Product_reference;
};