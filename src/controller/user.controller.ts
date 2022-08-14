import { Request, Response } from "express";
import log from "../utils/logger";
import {
    createUser,
    findAndUpdateUser,
    findUserById,
    updateUserInfo,
} from "../service/user.service";
import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const user = await createUser(req.body); // call create user service
        return res.send(user);
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.massage);
    }
}

export async function getUserHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const userInfo = await findUserById({ _id: userId });
        return res.send(userInfo);
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.massage);
    }
}

export async function updateUserHandler(
    req: Request<{}, {}, UpdateUserInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const update = req.body;
    console.log(update);

    const updatedUser = await updateUserInfo({ _id: userId }, update, {
        new: true,
    });

    return res.send(updatedUser);
}
