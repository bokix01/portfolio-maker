const { User, Review } = require('../models');

exports.review_get = async (req, res) => {
    try {
        const reviews = await Review.findAll();

        return res.status(200).json({
            message: 'Reviews data fetched successfully.',
            reviews: reviews
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching reviews data.',
            error: error
        });
    }
}

exports.review_create = async (req, res) => {
    try {
        const user = await User.findByPk(req.userData.user_id);

        const review = await new Review({
            description: req.body.description,
            rating: req.body.rating,
            user_id: user.id,
        });

        await review.save();

        return res.status(200).json({
            message: 'Review created successfully.',
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while creating review.',
            error: error
        });
    }
}

exports.review_id_get = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);

        return res.status(200).json({
            message: 'Review data fetched successfully.',
            review: review,
            owner: req.userData.user_id === review.user_id
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while fetching review data.',
            error: error
        });
    }
}

exports.review_id_edit = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        review.description = req.body.description;
        review.rating = req.body.rating;

        await review.save();

        return res.status(200).json({
            message: 'Review data changed successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while changing review data.',
            error: error
        });
    }
}

exports.review_id_delete = async (req, res) => {
    try {
        await Review.destroy({
            where: {
                id: req.params.reviewId
            }
        });

        return res.status(200).json({
            message: 'Review data deleted successfully.'
        });
    } catch(error) {
        return res.status(500).json({
            message: 'An error occurred while deleting review data.',
            error: error
        });
    }
}
