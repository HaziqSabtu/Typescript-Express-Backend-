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
exports.createComment = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
// import ProductModel, { ProductDocument } from "../models/product.model";
function createComment(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return comment_model_1.default.create(input);
    });
}
exports.createComment = createComment;
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
