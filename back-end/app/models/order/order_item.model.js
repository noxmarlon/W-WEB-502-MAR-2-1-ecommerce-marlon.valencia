module.exports = (sequelize, Sequelize) => {
    const Order_item = sequelize.define("order_items", {
        quantity: {
            type: Sequelize.INTEGER
        }
    });
    return Order_item;
};