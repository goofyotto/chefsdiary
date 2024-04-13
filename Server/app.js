
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.get('/file', (req, res) => {

    res.sendFile(path.join(__dirname, 'staticFiles/image.jpg'));
});

app.use('/static', express.static(path.join(__dirname, 'staticFiles')))

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
); 