module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        amount: {
            type: DataTypes.INTEGER
        },
        accepted: {
            type: DataTypes.BOOLEAN
        },
        item: {
            type: DataTypes.STRING
        },
        donatoremail: {
            type: DataTypes.STRING
        }
    })
    return Request
};