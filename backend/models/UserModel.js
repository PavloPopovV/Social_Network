import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
    location: { type: String, default: "Невідоме місцезнаходження" },
    bio: { type: String, default: "Це мій профіль" },
    profilePic: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "Follows" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Follows" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", UserSchema);
export default User;
