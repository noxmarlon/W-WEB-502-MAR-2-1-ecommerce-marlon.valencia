module.exports = (sequelize, Sequelize) => {
    const Rate = sequelize.define("rates", {
        product_id: {
            type: Sequelize.INTEGER
        },
        note: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        }
    });
    return Rate;
};