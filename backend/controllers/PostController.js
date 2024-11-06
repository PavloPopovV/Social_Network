import {
  CommentModel,
  LikeModel,
  PostModel,
  UserModel,
} from "../models/index.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content)
      return res.status(400).json({ message: "This field can't be empty" });

    const post = await PostModel.create({
      content,
      author: userId,
    });

    await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    return res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const post = await PostModel.findById(id)
      .populate("author", "firstName lastName profilePic")
      .populate({
        path: "comments",
        populate: { path: "user", select: "firstName lastName profilePic" },
      })
      .populate("likes");

    if (!post) return res.status(404).json({ message: "Post not found" });

    const postWithLike = {
      ...post.toObject(),
      likedByUser: post.likes.some((like) => like.user.toString() === userId),
    };

    return res.status(200).json(postWithLike);
  } catch (error) {
    console.error("Get post by id error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userId: queryUserId } = req.query;

    const posts = queryUserId
      ? await PostModel.find({ author: queryUserId })
          .populate("author", "firstName lastName profilePic")
          .populate("likes")
          .populate("comments")
      : await PostModel.find()
          .populate("author", "firstName lastName profilePic")
          .populate("likes")
          .populate("comments");

    const postWithLike = posts.map((post) => ({
      ...post._doc,
      likedByUser: post.likes.some((like) => like.user.toString() === userId),
    }));

    return res.status(200).json(postWithLike);
  } catch (error) {
    console.error("Get all posts error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await PostModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId)
      return res.status(403).json({ message: "No access" });

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { content },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await PostModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId)
      return res.status(404).json({ message: "No accsses" });

    const comments = await CommentModel.find({ post: id });
    const likes = await LikeModel.find({ post: id });

    await Promise.all([
      PostModel.findByIdAndDelete(id),
      CommentModel.deleteMany({ post: id }),
      LikeModel.deleteMany({ post: id }),
      UserModel.findByIdAndUpdate(userId, {
        $pull: {
          posts: id,
          comments: { $in: comments.map((c) => c._id) },
          likes: { $in: likes.map((l) => l._id) },
        },
      }),
    ]);

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
