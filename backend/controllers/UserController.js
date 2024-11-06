import { UserModel } from "../models/index.js";

export const current = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Current user error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("User by id error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, bio, location } = req.body;

    if (id !== req.user.id)
      return res.status(403).json({ message: "No accsses" });

    if (email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    const currentUser = await UserModel.findById(id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedProfilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { email, firstName, lastName, bio, location,  profilePic: updatedProfilePic, },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Edit user error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { firstName } = req.query;
    const query = {};

    if (firstName) query.firstName = new RegExp(firstName, 'i');

    const users = await UserModel.find(query)
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
