const express = require('express');
//const router = express.Router();            //is this necessary? is this correct?
//Import the Router class from express. Router is a named import, not default.
const { Router } = require('express');
const Team = require('./model');

const router = new Router()

router.get('/team', (req, res, next) => {
    Team
        .findAll()
        .then(teams => {
            res
                .status(200)
                .json({ teams: teams })
        })
        // .catch(err => {
        //     res.status(500).json({
        //         message: 'Something went wrong',
        //         error: err
        //     })
        // })
        .catch(error => next(error))            //what is "next"? what does it do?
})

router.post('/team', (req, res, next) => {
    Team
        .create(req.body)
        .then(team => {
            res.status(201).json({
                message: "A NEW TEAM WAS ADDED",
                "new Team": team
            })
        })
        // .catch(err => {
        //     res
        //         .status(500)
        //         .json({
        //             message: "Something went wrong on our side. Sorry.",
        //             error: err
        //         })
        // })
        .catch(error => next(error))
})

module.exports = router