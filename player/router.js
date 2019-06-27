const Team = require('../team/model');
const express = require('express');
const { Router } = require('express');
const Player = require('./model');

const router = new Router()

// "/player"

//show all players
router.get('/player', (req, res, next) => {
    const limit = req.query.limit || 25             //return how many results
    const offset = req.query.offset || 0            //starting at wat result

    Promise.all([                                   //.count & .findall first happen sequentially : but are not depended on each other to run together return promise when execurted
        Player.count(),                             //counting total amount of results
        Player.findAll({ limit, offset })           //find all within these parameters               
    ])
        .then(([total, players]) => {               //both respsonese of promises
            res
                .status(200)
                .send({
                    players: players,
                    "Amount of players on this 'page'": total
                })
        })
        .catch(error => next(error))
})

// add new player
router.post('/player', (req, res, next) => {
    Player
        .create(req.body)
        .then(player => {
            res
                .status(201)
                .json({
                    message: "A NEW PLAYER WAS ADDED",
                    "new Player": player
                })
        })
        .catch(error => next(error))
})

// "/player/:id"

//show a player by id
router.get('/player/:id', (req, res, next) => {
    const id = req.params.id
    Player
        .findByPk(id, { include: [Team] })
        .then(player => {
            res
                .status(200)
                .json({ player: player })
        })
        .catch(error => next(error))
})

//update a player by id
router.put('/player/:id', (req, res, next) => {
    const id = req.params.id
    Player
        .findByPk(id)
        .then(player => {
            if (player) {
                player.update(req.body)
                    .then(player => {
                        res
                            .status(200)
                            .json({ player })
                    })
            } else {
                res
                    .status(404)
                    .json({
                        message: "Player not found"
                    })
            }
        })
        .catch(error => next(error))
})

module.exports = router