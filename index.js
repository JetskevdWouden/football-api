const express = require('express');
const app = express();                          //this const is the api server
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`))