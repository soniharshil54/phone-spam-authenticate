const express = require('express');

const logger = require('./utils/logger');

const app = express();

require('./db')

require('./routes')(app);

app.listen(3000, () => {
    logger.info('API Service is running on port 3000');
});