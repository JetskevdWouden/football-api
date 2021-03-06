//const express = require('express');
const { Router } = require('express');
const Team = require('./model');

const router = new Router()

// "/team"

//show all teams
router.get('/team', (req, res, next) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    Promise.all([
        Team.count(),
        Team.findAll({ limit, offset })
    ])
        .then(([total, teams]) => {
            res
                .status(200)
                .send({
                    teams: teams,
                    "Amount of teams on this 'page'": total
                })
        })
        .catch(error => next(error))
})

//add a team
router.post('/team', (req, res, next) => {
    Team
        .create(req.body)
        .then(team => {
            res
                .status(201)
                .json({
                    message: "A NEW TEAM WAS ADDED",
                    "new Team": team
                })
        })
        .catch(error => next(error))
})

// "/team/:id"

//show a team by id
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

//update a team by id
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