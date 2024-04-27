const express = require('express');

const app = express();

require('./routes')(app);

app.listen(3000, () => {
    console.log('API Service is running on port 3000');
});