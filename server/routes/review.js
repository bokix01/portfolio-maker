const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const checkOwnership = require('../middleware/checkOwnership');
const reviewController = require('../controllers/review');

router.get('/', reviewController.review_get);
router.post('/', checkAuth, reviewController.review_create);
router.get('/:reviewId', checkAuth, reviewController.review_id_get);
router.put('/:reviewId', checkAuth, checkOwnership, reviewController.review_id_edit);
router.delete('/:reviewId', checkAuth, checkOwnership, reviewController.review_id_delete);

module.exports = router;
