import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        comment: string({
            required_error: "Comment is Required",
        })
            .min(1, "Content should be atleast 1 Characters long")
            .max(200, "Content maximum Length is 200"),
        postId: string({
            required_error: "PostId is Required",
        }),
    }),
};

export const createCommentSchema = object({ ...payload });

// export const updatePostSchema = object({ ...payload, ...params });

// export const deletePostSchema = object({ ...params });

// export const getPostSchema = object({ ...params });

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
// export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
// export type DeletePostInput = TypeOf<typeof deletePostSchema>;
// export type GetPostInput = TypeOf<typeof getPostSchema>;
