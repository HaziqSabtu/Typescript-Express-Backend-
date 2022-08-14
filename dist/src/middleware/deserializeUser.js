"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get access token
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    // get refresh token
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    // if there is no access token return next
    if (!accessToken) {
        return next();
    }
    // if access token is available -> verify
    // get user from token
    const { decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    // get user from decoded
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    // if tokens already expired reissue new access token
    if (expired && refreshToken) {
        const newAccessToken = yield (0, session_service_1.reissueAccessToken)({ refreshToken });
        // if new access token -> set to header
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }
        // reverify newly issue accestoken
        const result = (0, jwt_utils_1.verifyJwt)(newAccessToken);
        // get user from decoded
        res.locals.user = result.decoded;
    }
    return next();
});
exports.default = deserializeUser;
