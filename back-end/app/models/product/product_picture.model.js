module.exports = (sequelize, Sequelize) => {
    const Product_picture = sequelize.define("product_picture", {
        product_id: {
            type: Sequelize.INTEGER
        },
        picture: {
            type: Sequelize.STRING
        }
    });
    return Product_picture;
};