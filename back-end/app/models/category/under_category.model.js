module.exports = (sequelize, Sequelize) => {
    const Under_category = sequelize.define("under_categories", {
        name: {
            type: Sequelize.STRING
        }
    });
    return Under_category;
};