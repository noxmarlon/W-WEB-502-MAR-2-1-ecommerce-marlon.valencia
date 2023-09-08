module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("carts", {
        price: {
            type: Sequelize.FLOAT
        }
    });
    return Cart;
};