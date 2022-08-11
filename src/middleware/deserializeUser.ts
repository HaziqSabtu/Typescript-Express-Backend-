import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {get} from 'lodash'
import { reissueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser= async (req:Request, res:Response, next:NextFunction) =>{
    // get access token
    const accessToken = get(req,'headers.authorization','').replace(/^Bearer\s/,"")

    // get refresh token
    const refreshToken = get(req, 'headers.x-refresh')

    // if there is no access token return next
    if(!accessToken){
        return next()
    }

    // if access token is available -> verify
    const {decoded, expired} = verifyJwt(accessToken)

    //
    if(decoded){
        res.locals.user = decoded
        return next()
    }

    // if tokens already expired reissue new access token
    if(expired && refreshToken){
        const newAccessToken = await reissueAccessToken({refreshToken})

        if (newAccessToken){
            res.setHeader('x-access-token', newAccessToken)
        }

        const result = verifyJwt(newAccessToken as string)

        res.locals.user = result.decoded
    }

    

    return next()

}

export default deserializeUser