const express = require('express');
const router = express.Router();

const HealthcheckController = require('../controllers/HealthcheckController');

router.get('/', HealthcheckController.healthcheck);

module.exports = router;