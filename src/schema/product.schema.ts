import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "Title is Required",
        }),
        description: string({
            required_error: "Description is Required",
        }).min(120, "Description should be atleast 120 Characters long"),
        price: number({
            required_error: "Price is Required",
        }),
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

export const createProductSchema = object({ ...payload });

export const updateProductSchema = object({ ...payload, ...params });

export const deleteProductSchema = object({ ...params });

export const getProductSchema = object({ ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
