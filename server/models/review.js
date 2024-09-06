const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config');

class Review extends Model {}

Review.init({
    rating: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Review'
});

module.exports = Review;
