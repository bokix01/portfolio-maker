const User = require('./user');
const Review = require('./review');

// User and Review association
User.hasOne(Review, {onDelete: 'cascade'});
Review.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {
    User,
    Review,
}
