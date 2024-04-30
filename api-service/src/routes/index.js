const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A simple API to search and retrieve contacts',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/**/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUi = require('swagger-ui-express');

const { responseHandler } = require('../middlewares/responseHandler');
const { protect } = require('../middlewares/checkAuth');

module.exports = function routes(app) {
    app.use('/api/v1/healthcheck', responseHandler, require('./healthcheck'));
    app.use('/api/v1/auth', responseHandler, require('./auth'));
    app.use('/api/v1/spam', responseHandler, protect, require('./spam'));
    app.use('/api/v1/contact', responseHandler, protect, require('./contact'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};