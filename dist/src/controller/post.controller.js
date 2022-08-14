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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsHandler = exports.createPostHandler = void 0;
// import {
//     CreateProductInput,
//     UpdateProductInput,
// } from "../schema/product.schema";
const post_service_1 = require("../service/post.service");
// import {
//     createProduct,
//     deleteProduct,
//     findAndUpdateProduct,
//     findProduct,
// } from "../service/product.service";
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const postedBy = res.locals.user._id;
        const post = yield (0, post_service_1.createPost)(Object.assign(Object.assign({}, body), { postedBy: postedBy, comments: [] }));
        return res.send(post);
    });
}
exports.createPostHandler = createPostHandler;
function getAllPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allPosts = yield (0, post_service_1.findAllPosts)();
        return res.send(allPosts);
    });
}
exports.getAllPostsHandler = getAllPostsHandler;
// export async function updatePostHandler(
//     req: Request<UpdateProductInput["params"]>,
//     res: Response
// ) {
//     const userId = res.locals.user._id;
//     console.log("updateing");
//     const productId = req.params.productId;
//     console.log(productId);
//     const update = req.body;
//     console.log(update);
//     const product = await findProduct({ productId });
//     console.log(product);
//     // product not available
//     if (!product) {
//         return res.sendStatus(404);
//     }
//     console.log(product.user);
//     console.log(userId);
//     if (String(product.user) !== userId) {
//         console.log("forbidden");
//         return res.sendStatus(403);
//     }
//     const updatedProduct = await findAndUpdateProduct({ productId }, update, {
//         new: true,
//     });
//     return res.send(updatedProduct);
// }
// export async function getProductHandler(
//     req: Request<UpdateProductInput["params"]>,
//     res: Response
// ) {
//     console.log("getting");
//     const productId = req.params.productId;
//     console.log(productId);
//     const product = await findProduct({ productId });
//     console.log(product);
//     if (!product) {
//         return res.sendStatus(404);
//     }
//     return res.send(product);
// }
// export async function deleteProductHandler(
//     req: Request<UpdateProductInput["params"]>,
//     res: Response
// ) {
//     const userId = res.locals.user._id;
//     const productId = req.params.productId;
//     const update = req.body;
//     const product = await findProduct({ productId });
//     if (!product) {
//         return res.sendStatus(404);
//     }
//     if (String(product.user) !== userId) {
//         return res.sendStatus(403);
//     }
//     await deleteProduct({ productId });
//     return res.sendStatus(200);
// }
