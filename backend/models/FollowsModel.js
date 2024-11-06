import { Schema, model } from "mongoose";

const FollowsSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true, versionKey: false });

const Follows = model("Follows", FollowsSchema);
export default Follows;
