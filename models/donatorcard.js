
module.exports = function (sequelize, DataTypes) {

    var DonatorCard = sequelize.define('DonatorCard', {

        startdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false
        },
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
        itemnumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING
        },
        useremail: {
            type: DataTypes.STRING,
        }
    });
    
    DonatorCard.associate = function (models) {

        DonatorCard.belongsTo(models.User, {
            through: {
                model: models.Request
            }
        });

    };

    return DonatorCard;
};