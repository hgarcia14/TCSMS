const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { verifyData } = require('../middleware/validations');

router.post('/', verifyData, subscriptionController.setSubscription);

module.exports = router;