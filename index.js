const express = require('express');
const app = express();                          //this const is the api server
const port = process.env.PORT || 4000;
const db = require('./db')                      //correctly imported? Y
const Team = require('./team/model')
const teamRouter = require('./team/router')

app.use(teamRouter);

app.listen(port, () => console.log(`Listening on port ${port}`))