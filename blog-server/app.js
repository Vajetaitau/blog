const express = require('express');
const app = express();
const path = require('path');

app.use(
    express.static(path.join(__dirname + '/app/public'))
);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/app/public/index.html'));
});

app.listen(8080, () => console.log('Blog server is running!'));