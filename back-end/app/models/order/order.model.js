module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        status: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        gift: {
            type: Sequelize.STRING
        }
    });
    return Order;
};