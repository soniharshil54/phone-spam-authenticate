/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors')

const logger = require('./utils/logger');
const errorHandler = require('./middlewares/error')

const app = express();

app.use(cors());
app.use(express.json());

// require('./db')

require('./routes')(app);

// Global error handler
process
    .on('unhandledRejection', (reason) => {
        logger.error(reason);
        logger.error('Unhandled Rejection at Promise(Global handler)');
    })
    .on('uncaughtException', async (err) => {
        logger.error(err);
        logger.error('Uncaught Exception thrown');
        logger.error(JSON.stringify(process.memoryUsage()));
        process.exit(1);
    });

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    logger.info('API Service is running on port 3000');
});