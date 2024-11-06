import { Schema, model } from "mongoose";

const LikeSchema  = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true, versionKey: false });

const Like = model("Like", LikeSchema );
export default Like;