import { LikeModel, PostModel, UserModel } from "../models/index.js";

export const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "This fields can't be empty" });

    const existingLike = await LikeModel.findOne({ post: id, user: userId });
    if (existingLike) return res.status(400).json({ message: "Already liked" });

    const like = await LikeModel.create({ post: id, user: userId })

    await Promise.all([
        await PostModel.findByIdAndUpdate(id, { $push: { likes: like._id }}),
        await UserModel.findByIdAndUpdate(userId, {$push: { likes: like._id }})
    ])

    return res.status(201).json(like);
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const unLikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Like ID is required" });

    const existingLike = await LikeModel.findOne({ post: id, user: userId });
    
    if (!existingLike) 
      return res.status(404).json({ message: "Like does not exist" });
    console.log(existingLike)
    await Promise.all([
      LikeModel.findByIdAndDelete(existingLike),
      PostModel.findByIdAndUpdate(existingLike.post, { $pull: { likes: existingLike._id } }),
      UserModel.findByIdAndUpdate(userId, {$pull: { likes: existingLike._id }}),
    ]);

    return res.status(200).json({ message: "Successfully unliked" });
  } catch (error) {
    console.error("unLike post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
