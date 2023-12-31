module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        name: {
            type: Sequelize.STRING
        },
        continent: {
            type: Sequelize.STRING
        }
    });
    return Country;
};