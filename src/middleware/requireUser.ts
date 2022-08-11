import { NextFunction, Request, Response } from "express";

const requireUser = (req:Request, res:Response, next:NextFunction)=>{
    const user = res.locals.user
    console.log(user)

    if(!user){
        console.log('returning here 403')
        return res.sendStatus(403)
    }

    return next()
}

export default requireUser