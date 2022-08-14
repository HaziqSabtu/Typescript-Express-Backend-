"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostSchema = exports.deletePostSchema = exports.updatePostSchemaAC = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        content: (0, zod_1.string)({
            required_error: "Content is Required",
        })
            .min(1, "Content should be atleast 1 Characters long")
            .max(200, "Content maximum Length is 200"),
        image: (0, zod_1.string)({
            required_error: "Image is Required",
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "ProductId is required",
        }),
    }),
};
//AC -> appendComment
const paramsAC = {
    params: (0, zod_1.object)({
        commentId: (0, zod_1.string)({
            required_error: "commentId is required",
        }),
    }),
};
exports.createPostSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updatePostSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.updatePostSchemaAC = (0, zod_1.object)(Object.assign({}, paramsAC));
exports.deletePostSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getPostSchema = (0, zod_1.object)(Object.assign({}, params));
