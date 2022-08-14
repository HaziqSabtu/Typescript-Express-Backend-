import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import PostModel, { PostDocument } from "../models/post.model";
// import ProductModel, { ProductDocument } from "../models/product.model";

export async function createPost(
    input: DocumentDefinition<Omit<PostDocument, "createdAt" | "updatedAt">>
) {
    return PostModel.create(input);
}

export async function findAllPosts() {
    return PostModel.find()
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
}

export async function findPostById(query: FilterQuery<PostDocument>) {
    return PostModel.findById(query);
}

export async function appendCommentToPost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
) {
    const oldPost = await findPostById(query);
    const nc = [];
    nc.push(...(oldPost?.comments || []), update?.comments);
    return await PostModel.findOneAndUpdate(query, { comments: nc }, options);
}
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
