import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        content: string({
            required_error: "Content is Required",
        })
            .min(1, "Content should be atleast 1 Characters long")
            .max(200, "Content maximum Length is 200"),
        image: string({
            required_error: "Image is Required",
        }),
    }),
};

const params = {
    params: object({
        productId: string({
            required_error: "ProductId is required",
        }),
    }),
};

//AC -> appendComment
const paramsAC = {
    params: object({
        commentId: string({
            required_error: "commentId is required",
        }),
    }),
};

export const createPostSchema = object({ ...payload });

export const updatePostSchema = object({ ...payload, ...params });

export const updatePostSchemaAC = object({ ...paramsAC });

export const deletePostSchema = object({ ...params });

export const getPostSchema = object({ ...params });

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type UpdatePostInputAC = TypeOf<typeof updatePostSchemaAC>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;
export type GetPostInput = TypeOf<typeof getPostSchema>;
