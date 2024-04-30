const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/ContactController');

/**
 * @openapi
 * /api/v1/contact/search-by-name:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Contacts
 *     summary: Search for contacts by name
 *     description: Returns a list of contacts matching the provided name.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the contact to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved list of contacts.
 *       401:
 *         description: Unauthorized access.
 */
router.get('/search-by-name', ContactController.searchContactsByName);

/**
 * @openapi
 * /api/v1/contact/search-by-number:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Contacts
 *     summary: Search for contacts by phone number
 *     description: Returns a list of contacts matching the provided phone number.
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         required: true
 *         description: Phone number of the contact to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved list of contacts.
 *       401:
 *         description: Unauthorized access.
 */
router.get('/search-by-number', ContactController.searchContactsByNumber);

/**
 * @openapi
 * /api/v1/contact/get-contact:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Contacts
 *     summary: Get a specific contact by ID
 *     description: Returns a contact by its unique ID.
 *     parameters:
 *       - in: query
 *         name: contactId
 *         required: true
 *         description: ID of the contact to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved contact.
 *       401:
 *         description: Unauthorized access.
 */
router.get('/get-contact', ContactController.getContact);

module.exports = router;
