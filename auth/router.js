const { Router } = require('express');
const { toJWT, toData } = require('./jwt')
const router = new Router();

//define end points here
router.post('/logins', (req, res, next) => {        //expect an email and password in json --> req.body
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
        res
            .send({
                jwt: toJWT({ userId: 1 })               //hard coded because no real database
            })
    } else {
        res
            .status(400)
            .send({
                message: "Please supply a valid email and password"
            })
    }
})

//secret endpoint
router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ');
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            res.send({
                message: 'Thanks for visiting the secret endpoint.',
                data
            })
        }
        catch (error) {
            res.status(400).send({
                message: `Error ${error.name}: ${error.message}`,
            })
        }
    } else {
        res
            .status(401)
            .send({
                message: 'Please suply some valid credentials.Thankssss'
            })
    }
})

module.exports = router;