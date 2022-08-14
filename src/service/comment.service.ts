import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import CommentModel, { CommentDocument } from "../models/comment.model";
import PostModel, { PostDocument } from "../models/post.model";
// import ProductModel, { ProductDocument } from "../models/product.model";

export async function createComment(
    input: DocumentDefinition<Omit<CommentDocument, "createdAt" | "updatedAt">>
) {
    return CommentModel.create(input);
}

// export async function findProduct(
//     query: FilterQuery<ProductDocument>,
//     options: QueryOptions = { lean: true }
// ) {
//     return ProductModel.findOne(query, {}, options);
// }

// export async function findAndUpdateProduct(
//     query: FilterQuery<ProductDocument>,
//     update: UpdateQuery<ProductDocument>,
//     options: QueryOptions
// ) {
//     return ProductModel.findOneAndUpdate(query, update, options);
// }

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//     return ProductModel.deleteOne(query);
// }
