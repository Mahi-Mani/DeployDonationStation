module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });

    User.associate = function (models) {

        User.belongsToMany(models.DonatorCard, {
            through: {
                model: models.Request
            }
        });

        User.belongsToMany(models.RequestorCard, {
            through: {
                model: models.Donation
            }
        });

    };

    return User;
};