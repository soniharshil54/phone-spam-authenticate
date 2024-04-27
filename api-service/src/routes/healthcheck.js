const express = require('express');
const router = express.Router();

const HealthcheckController = require('../controllers/HealthcheckController');

router.get('/', (req, res) => HealthcheckController.healthcheck(req, res));

module.exports = router;