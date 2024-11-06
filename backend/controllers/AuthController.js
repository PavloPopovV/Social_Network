import bcrypt from "bcryptjs";
import { UserModel } from "../models/index.js";
import generateToken from "../utils/generateToken.js";

export const registration = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName)
      return res.status(400).json({ message: "This fields can't be ampty" });

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // const userProfilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
    const userProfilePic = ``;

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      profilePic: userProfilePic,
    });

    const savedUser = await user.save();
    const token = generateToken(savedUser.id);

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "This fields can't be ampty" });

    const user = await UserModel.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Invalid login or password" });

    const valid = await bcrypt.compare(password, user.password);
    if ( !valid)
        return res.status(400).json({ message: "Invalid login or password" });

    const token = generateToken(user.id);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
