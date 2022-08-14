import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export interface CommentDocument extends mongoose.Document {
    comment: string;
    postedBy: UserDocument["_id"];
    createdAt: Date;
    updatedAt: Date;
}
const commentSchema = new mongoose.Schema(
    {
        commentId: {
            type: String,
            required: true,
            unique: true,
            default: () => `comment_${nanoid()}`,
        },
        comment: { type: String, required: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
