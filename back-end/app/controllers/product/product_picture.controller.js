module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("product_image", {
        product_id: {
            type: Sequelize.INTEGER
        },
        picture: {
            type: Sequelize.STRING
        }
    });
    return Country;
};