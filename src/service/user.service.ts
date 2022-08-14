import { omit } from "lodash";
import mongoose, {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
    input: DocumentDefinition<
        Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
    >
) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
        // return user.toJSON()
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    console.log(email);
    const user = await UserModel.findOne({ email });

    if (!user) {
        console.log("no user");
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}

//byby
export async function findUserById(query: FilterQuery<UserDocument>) {
    console.log(query);
    return UserModel.findById(query).lean();
}

export async function findAndUpdateUser(
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions
) {
    return UserModel.findOneAndUpdate(query, update, options);
}

export async function updateUserInfo(
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions
) {
    const oldDocument = await findUserById(query);
    const updatedDocument = { ...oldDocument, ...update };

    return UserModel.findOneAndUpdate(query, updatedDocument, options);
}
