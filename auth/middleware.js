const User = require('../user/model');
const { toData } = require('./jwt');
const { Router } = require('express');

function auth(req, res, next) {
    const auth = req.headers.authorization && req.headers.authorization.split(' ');
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            User
                .findByPk(data.userId)
                .then(user => {
                    if (!user)
                        return next('User does not exist :(')
                    req.user = user
                    next()
                })
                .catch(next)
        }
        catch (error) {
            res
                .status(400)
                .send({
                    message: `Error ${error.name} : ${error.message}`
                })
        }
    } else {
        res
            .status(400)
            .send({
                message: 'Please suply some valid credentials'
            })
    }
}

module.exports = auth;