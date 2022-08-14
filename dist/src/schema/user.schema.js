"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassSchema = exports.updateUserSchema = exports.getUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
//byby
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is Required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is Required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "PasswordConfirmation is Required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is Required",
        }).email("Not a valid Email"),
        profilePicture: (0, zod_1.string)({
            required_error: "Profile Picture is Required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "password do not match",
        path: ["passwordConfirmation"],
    }),
};
const updatePayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is Required",
        }),
        profilePicture: (0, zod_1.string)({
            required_error: "Profile Picture is Required",
        }),
    }),
};
const passwordPayload = {
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is Required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "PasswordConfirmation is Required",
        }),
        oldPassword: (0, zod_1.string)({
            required_error: "Old Password is Required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "password do not match",
        path: ["passwordConfirmation"],
    }),
};
//byby
const params = {
    params: (0, zod_1.object)({
        userId: (0, zod_1.string)({
            required_error: "UserId is required",
        }),
    }),
};
exports.createUserSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.getUserSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateUserSchema = (0, zod_1.object)(Object.assign({}, updatePayload));
exports.updateUserPassSchema = (0, zod_1.object)(Object.assign({}, passwordPayload));
