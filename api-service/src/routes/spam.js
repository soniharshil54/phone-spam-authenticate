const express = require('express');
const router = express.Router();

const SpamController = require('../controllers/SpamController');

router.post('/mark-as-spam', SpamController.markAsSpam);

module.exports = router;