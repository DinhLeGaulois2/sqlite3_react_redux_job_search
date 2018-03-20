module.exports = function (sequelize, Sequelize) {
    const Job = sequelize.define("job", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        appliedAt: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.TEXT
        },
        url: {
            type: Sequelize.STRING(500)
        }
    });

    return Job;
}