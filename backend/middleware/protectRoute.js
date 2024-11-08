import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';


const protectRoute = async (req, res, next) =>{
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized - No token Provide" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({ message: "Unauthorized - Invalid Token" });

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(404).json({ message: "User not found" });

        req.user = user
        next()
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default protectRoute;