"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        comment: (0, zod_1.string)({
            required_error: "Comment is Required",
        })
            .min(1, "Content should be atleast 1 Characters long")
            .max(200, "Content maximum Length is 200"),
        postId: (0, zod_1.string)({
            required_error: "PostId is Required",
        }),
    }),
};
exports.createCommentSchema = (0, zod_1.object)(Object.assign({}, payload));
// export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
// export type DeletePostInput = TypeOf<typeof deletePostSchema>;
// export type GetPostInput = TypeOf<typeof getPostSchema>;
