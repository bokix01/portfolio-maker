const { Review } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const review = await Review.findOne({
            where: {
                id: req.params.reviewId,
                user_id: req.userData.user_id
            }
        });

        if (review) {
            next();
        } else {
            return res.status(401).json({
                message: 'Not author of the review'
            });
        }
    } catch(error) {
        return res.status(500).json({
            error: error
        });
    }
}
