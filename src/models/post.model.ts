import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";
import { CommentDocument } from "./comment.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export interface PostDocument extends mongoose.Document {
    postedBy: UserDocument["_id"];
    content: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    comments: [CommentDocument["_id"]];
}
const postSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
            unique: true,
            default: () => `post_${nanoid()}`,
        },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ref -> refer to model
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        content: { type: String, required: true },
        image: { type: String }, //image is not required
    },
    { timestamps: true }
);

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
