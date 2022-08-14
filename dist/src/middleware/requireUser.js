"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    console.log(user);
    if (!user) {
        console.log("returning here 403");
        return res.sendStatus(403);
    }
    console.log("user get");
    return next();
};
exports.default = requireUser;
