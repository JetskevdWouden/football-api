const express = require('express');
const router = express.Router();            //is this necessary? is this correct?
//Import the Router class from express. Router is a named import, not default.
const Team = require('./model');

const teamRouter = router.get('/team', (req, res, next) => {
    Team
        .findAll()
        .then(teams => {
            res
                .status(200)
                .json({ teams: teams })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

module.exports = teamRouter