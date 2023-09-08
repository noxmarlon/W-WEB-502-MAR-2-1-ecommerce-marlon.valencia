module.exports = (sequelize, Sequelize) => {
    const Cart_item = sequelize.define("cart_items", {
        quantity: {
            type: Sequelize.FLOAT
        }
    });
    return Cart_item;
};