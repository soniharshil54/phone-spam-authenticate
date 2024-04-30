const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

/**
 * @openapi
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: String
 *               email:
 *                 type: String
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully created.
 *       400:
 *         description: Error in request.
 */
router.post('/sign-up', AuthController.signUp);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns token.
 *       401:
 *         description: Unauthorized.
 */
router.post('/login', AuthController.logIn);

module.exports = router;