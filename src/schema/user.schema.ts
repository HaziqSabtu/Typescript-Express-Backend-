import { object, string, TypeOf } from "zod";

//byby
const payload = {
    body: object({
        name: string({
            required_error: "Name is Required",
        }),
        password: string({
            required_error: "Password is Required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation is Required",
        }),
        email: string({
            required_error: "Email is Required",
        }).email("Not a valid Email"),
        profilePicture: string({
            required_error: "Profile Picture is Required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "password do not match",
        path: ["passwordConfirmation"],
    }),
};

const updatePayload = {
    body: object({
        name: string({
            required_error: "Name is Required",
        }),
        profilePicture: string({
            required_error: "Profile Picture is Required",
        }),
    }),
};

const passwordPayload = {
    body: object({
        password: string({
            required_error: "Password is Required",
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation is Required",
        }),
        oldPassword: string({
            required_error: "Old Password is Required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "password do not match",
        path: ["passwordConfirmation"],
    }),
};

//byby
const params = {
    params: object({
        userId: string({
            required_error: "UserId is required",
        }),
    }),
};

export const createUserSchema = object({ ...payload });

export const getUserSchema = object({ ...params });

export const updateUserSchema = object({ ...updatePayload });

export const updateUserPassSchema = object({ ...passwordPayload });

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;

export type GetUserInput = TypeOf<typeof getUserSchema>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export type UpdateUserPassInput = TypeOf<typeof updateUserSchema>;
