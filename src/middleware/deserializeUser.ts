import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reissueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // get access token
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    // get refresh token
    const refreshToken = get(req, "headers.x-refresh");

    // if there is no access token return next
    if (!accessToken) {
        return next();
    }

    // if access token is available -> verify
    // get user from token
    const { decoded, expired } = verifyJwt(accessToken);

    // get user from decoded
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    // if tokens already expired reissue new access token
    if (expired && refreshToken) {
        const newAccessToken = await reissueAccessToken({ refreshToken });

        // if new access token -> set to header
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        // reverify newly issue accestoken
        const result = verifyJwt(newAccessToken as string);

        // get user from decoded
        res.locals.user = result.decoded;
    }

    return next();
};

export default deserializeUser;
