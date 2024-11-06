import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true, versionKey: false });

const Comment = model("Comment", CommentSchema);
export default Comment;
