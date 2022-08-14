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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = exports.getUserHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const user_service_1 = require("../service/user.service");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body); // call create user service
            return res.send(user);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.massage);
        }
    });
}
exports.createUserHandler = createUserHandler;
function getUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const userInfo = yield (0, user_service_1.findUserById)({ _id: userId });
            return res.send(userInfo);
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.massage);
        }
    });
}
exports.getUserHandler = getUserHandler;
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const update = req.body;
        console.log(update);
        const updatedUser = yield (0, user_service_1.updateUserInfo)({ _id: userId }, update, {
            new: true,
        });
        return res.send(updatedUser);
    });
}
exports.updateUserHandler = updateUserHandler;
