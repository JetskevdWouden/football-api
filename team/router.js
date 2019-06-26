const express = require('express');
const { Router } = require('express');
const Team = require('./model');

const router = new Router()

// "/team"

router.get('/team', (req, res, next) => {
    Team
        .findAll()
        .then(teams => {
            res
                .status(200)
                .json({ teams: teams })
        })
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
        .catch(error => next(error))
})

// "/team/:id"

router.get('/team/:id', (req, res, next) => {
    const id = req.params.id
    Team
        .findByPk(id)
        .then(team => {
            res
                .status(200)
                .json({ team: team })
        })
        .catch(error => next(error))
})

router.put('/team/:id', (req, res, next) => {
    const id = req.params.id
    Team
        .findByPk(id)
        .then(team => {
            if (team) {
                team.update(req.body)
                    .then(team => {
                        res
                            .status(200)
                            .json({ team })
                    })
            } else {
                res
                    .status(404)
                    .json({
                        message: "Team not found"
                    })
            }
        })
        .catch(error => next(error))
})

module.exports = router