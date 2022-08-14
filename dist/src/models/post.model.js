"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789");
const postSchema = new mongoose_1.default.Schema({
    postId: {
        type: String,
        required: true,
        unique: true,
        default: () => `post_${nanoid()}`,
    },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment" }],
    content: { type: String, required: true },
    image: { type: String }, //image is not required
}, { timestamps: true });
const PostModel = mongoose_1.default.model("Post", postSchema);
exports.default = PostModel;
