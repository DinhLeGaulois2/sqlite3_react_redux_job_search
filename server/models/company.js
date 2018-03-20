module.exports = function (sequelize, Sequelize) {
    const Company = sequelize.define("company", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        type: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        }
    });

    return Company;
}