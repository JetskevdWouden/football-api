const express = require('express');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');

const router = new Router();

// '/user'
router.post('/user', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User
        .create(user)
        .then(user => {
            res
                .status(201)
                .json({
                    message: "A NEW USER WAS ADDED - better not show that password...",
                    "new user": user
                })
        })
        .catch(error => next(error))
})

module.exports = router;