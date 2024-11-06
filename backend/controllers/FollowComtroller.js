import { FollowsModel, UserModel } from "../models/index.js";

export const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const {id:followingId} = req.params;

    if(userId === followingId) 
        return res.status(400).json({ message: "You cant subscribe on your self" });

    const existingSub = await FollowsModel.findOne({follower:userId, following:followingId})
    if (existingSub)
        return res.status(400).json({ message: "You already subscribe" });

    const newFollow = new FollowsModel({follower: userId, following: followingId});
    await newFollow.save();

    await Promise.all([
        await UserModel.findByIdAndUpdate(userId, {$addToSet: { following: followingId }}),
        await UserModel.findByIdAndUpdate(followingId, {$addToSet: { followers: userId }})
    ])

    return res.status(201).json({ message: "Successfully subscribe" });
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const {id:followingId} = req.params;

 

    const follows = await FollowsModel.findOne({follower:userId, following:followingId})
    if (!follows) return res.status(400).json({ message: "You are not sub on this user" });

    await Promise.all([
        await FollowsModel.findByIdAndDelete(follows._id),
        await UserModel.findByIdAndUpdate(userId, {$pull: { following: followingId }}),
        await UserModel.findByIdAndUpdate(followingId, {$pull: { followers: userId }})
    ])

    return res.status(201).json({ message: "Successfully un subscribe" });
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserFollows = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; 

  try {
    let follows;

    if (type === 'followers') {
      follows = await FollowsModel.find({ following: id }).populate('follower', 'firstName lastName profilePic');
    } else if (type === 'following') {
      follows = await FollowsModel.find({ follower: id }).populate('following', 'firstName lastName profilePic');
    }
    res.json(follows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
