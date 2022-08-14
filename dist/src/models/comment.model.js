"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789");
const commentSchema = new mongoose_1.default.Schema({
    commentId: {
        type: String,
        required: true,
        unique: true,
        default: () => `comment_${nanoid()}`,
    },
    comment: { type: String, required: true },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const CommentModel = mongoose_1.default.model("Comment", commentSchema);
exports.default = CommentModel;
