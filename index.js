const express = require('express');
const bodyParser = require('body-parser')
const db = require('./db')                      //correctly imported? Y

const team = require('./team/model')
const teamRouter = require('./team/router')

const player = require('./player/model')
const playerRouter = require('./player/router')

const JWT = require('./auth/jwt')
const authRouter = require('./auth/router')

const app = express();                          //this const is the api server
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(teamRouter);
app.use(playerRouter);
app.use(authRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))