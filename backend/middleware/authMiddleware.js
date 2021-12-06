import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {

            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded)

            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token)
    {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

const leadCreator = (req,res,next) => {
    if(req.user && req.user.isLeadCreator){
        next()
    }

    else{
        res.status(401)
        throw new Error ('Not authorized as LeadCreator')
    }
}

const leadExecutive = (req,res,next) => {
    if(req.user && req.user.isLeadExecutive){
        next()
    }

    else{
        res.status(401)
        throw new Error ('Not authorized as LeadExecutive')
    }
}

const leadManager = (req,res,next) => {
    if(req.user && req.user.isLeadManager){
        next()
    }

    else{
        res.status(401)
        throw new Error ('Not authorized as an LeadManager')
    }
}

export {protect, leadCreator, leadExecutive, leadManager} 