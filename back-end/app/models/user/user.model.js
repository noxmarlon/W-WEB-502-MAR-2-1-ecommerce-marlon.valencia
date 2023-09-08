module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        country_code: {
            type: Sequelize.INTEGER
        },
        state: {
            type: Sequelize.STRING
        }
    });
    return User;
};