module.exports = function (sequelize, DataTypes) {

    var RequestorCard = sequelize.define('RequestorCard', {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberneeded: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING
        },
        useremail: {
            type: DataTypes.STRING,
        }
    });
    
    RequestorCard.associate = function (models) {

        RequestorCard.belongsTo(models.User, {
            through: {
                model: models.Donation
            }
        });

    };

    return RequestorCard;
};