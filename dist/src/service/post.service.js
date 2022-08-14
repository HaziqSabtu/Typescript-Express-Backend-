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
exports.appendCommentToPost = exports.findPostById = exports.findAllPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
// import ProductModel, { ProductDocument } from "../models/product.model";
function createPost(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return post_model_1.default.create(input);
    });
}
exports.createPost = createPost;
function findAllPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return post_model_1.default.find()
            .populate({
            path: "postedBy",
            select: "name profilePicture _id",
        })
            .populate({
            path: "comments",
            populate: {
                path: "postedBy",
                select: "name profilePicture _id",
            },
        })
            .lean()
            .sort("-createdAt");
    });
}
exports.findAllPosts = findAllPosts;
function findPostById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return post_model_1.default.findById(query);
    });
}
exports.findPostById = findPostById;
function appendCommentToPost(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldPost = yield findPostById(query);
        const nc = [];
        nc.push(...((oldPost === null || oldPost === void 0 ? void 0 : oldPost.comments) || []), update === null || update === void 0 ? void 0 : update.comments);
        return yield post_model_1.default.findOneAndUpdate(query, { comments: nc }, options);
    });
}
exports.appendCommentToPost = appendCommentToPost;
// export async function appendCommentToPost(
//     query: FilterQuery<PostDocument>,
//     update: UpdateQuery<PostDocument>,
//     options: QueryOptions
// ) {
//     return PostModel.findOneAndUpdate(query, update, options);
// }
// export async function findProduct(
//     query: FilterQuery<ProductDocument>,
//     options: QueryOptions = { lean: true }
// ) {
//     return ProductModel.findOne(query, {}, options);
// }
// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//     return ProductModel.deleteOne(query);
// }
