module.exports = function (sequelize, Sequelize) {
    const CompanyLocation = sequelize.define("companyLocation", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        town: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        }
    });

    return CompanyLocation;
}