const express = require('express');
const router = express.Router();

const {asyncHandler} = require('../utils/asyncHandler')

const SpamController = require('../controllers/SpamController');

/**
 * @openapi
 * /api/v1/spam/mark-as-spam:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Spam
 *     summary: Mark a phone number as spam
 *     description: This endpoint marks a given phone number as spam in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to mark as spam.
 *                 example: '1234567890'
 *     responses:
 *       200:
 *         description: Phone number successfully marked as spam.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Phone number marked as spam successfully.'
 *       400:
 *         description: Bad request if the phone number is not provided or malformed.
 *       401:
 *         description: Unauthorized if the user is not authenticated.
 */
router.post('/mark-as-spam', asyncHandler(SpamController.markAsSpam));

module.exports = router;