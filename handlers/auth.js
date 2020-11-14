const db = require('../models')
const jwt = require('jsonwebtoken')

exports.signin = async function(req, res, next){
    try {
         // find user
        let user = await db.User.findOne({
            email: req.body.email
        }).exec()

        let { id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if password matches
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY)

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        }else {
            return next({
                status: 400,
                message: "Invalid email/password."
            })
        }
    } catch (error) {
        return next({
            status: 400,
            message: "Invalid email/password."
        })
    }
}

exports.signup = async function(req, res, next){
    try{
        // create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;

        // create a token
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY)

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })


    }catch(err){
        // if validation fails
        if(err.code === 11000){
            err.message = "Sorry, that username and/or is taken."
        }

        return next({
            status: 400,
            message: err.message
        })
    }
}