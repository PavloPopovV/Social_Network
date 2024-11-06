import { CommentModel, PostModel, UserModel } from "../models/index.js";


export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, content } = req.body;

    if (!content)
      return res.status(400).json({ message: "This fields can't be empty" });

    const comment = await CommentModel.create({
      content,
      user: userId,
      post: postId,
    });

    await Promise.all([
      await PostModel.findByIdAndUpdate(postId, {$push: { comments: comment._id }}),
      await UserModel.findByIdAndUpdate(userId, {$push: { comments: comment._id }})
    ]);

    const io = req.app.get("io");
    if (io) {
      io.to(postId).emit("newComment", { postId, comment });
    }


    return res.status(201).json(comment);
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    console.log(id)

    const comment = await CommentModel.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(403).json({ message: "No access" });

    await Promise.all([
        CommentModel.findByIdAndDelete(id),
        PostModel.findByIdAndUpdate(comment.post, {$pull: { comments: id }}),
        UserModel.findByIdAndUpdate(userId, {$pull: { comments: id }}),
    ]);

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
