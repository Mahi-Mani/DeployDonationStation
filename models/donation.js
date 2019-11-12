module.exports = function(sequelize, DataTypes) {
    var Donation = sequelize.define("Donation", {
        amount: {
            type: DataTypes.INTEGER
        },
        accepted: {
            type: DataTypes.BOOLEAN
        },
        item: {
            type: DataTypes.STRING
        },
        requestoremail: {
            type: DataTypes.STRING
        }
    })
    return Donation
};