const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/sign-up', AuthController.signUp);

module.exports = router;