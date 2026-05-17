const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next){

    const token = req.cookies.token
    //To Know about the user

    if(!token){
        return res.status(401).json({
            message: "Token not Provided"
        })
    }

    //check whether token is blacklisted or not
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid"
        })
    }

    try{
        //To verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded              //new property added to res object to know about the user details in future middlewares or controllers

        next()

    }catch(err){

        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {authUser}