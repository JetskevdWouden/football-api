const express = require('express');
const db = require('./db')                      //correctly imported? Y
const team = require('./team/model')
const teamRouter = require('./team/router')

const app = express();                          //this const is the api server
app.use(teamRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))