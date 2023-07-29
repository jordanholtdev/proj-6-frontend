const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port if available

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
