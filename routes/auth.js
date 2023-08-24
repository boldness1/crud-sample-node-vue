const express = require("express");
const router = express.Router();

const {User} = require("../models");
const bcrypt = require("bcrypt");

const userService = require('../services/User')
const {validationResult, body} = require('express-validator');
const {loginValidator} = require('../validators/loginValidator')
const {registerValidator } = require("../validators/registerValidator");

router.post('/login',
    loginValidator()
    ,
    async (req, res, next) => {

        const result = validationResult(req);

        if (result.errors && result.errors.length) {
            return res.send({
                message: "Validation Error",
                errors: result.errors
            });
        }

        return res.send(await userService.loginUser(req.body))

    });


router.put('/register',
    registerValidator(),
    async function (req, res, next) {


    const result = validationResult(req);

    if (result.errors && result.errors.length) {
        return res.send({
            message: "Validation Error",
            errors: result.errors
        });
    }

    return res.send(await userService.addUser(req.body));

});


module.exports = router;
