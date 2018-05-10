const express = require('express');
const app = express();

require('./controllers/register-controllers')(app).registerControllers();

app.listen(3000, () => console.log('Example app listeneing on port 3000!'));