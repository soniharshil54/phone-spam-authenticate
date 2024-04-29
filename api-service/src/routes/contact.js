const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/ContactController');

router.get('/search-by-name', ContactController.searchContactsByName);

router.get('/search-by-number', ContactController.searchContactsByNumber);

router.get('/get-contact', ContactController.getContact);

module.exports = router;