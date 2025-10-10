import jwt from "jsonwebtoken";

// Middleware to decode JWT token and extract clerkId
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token (not verify, just decode for now)
    const token_decode = jwt.decode(token);


    if (!token_decode || !token_decode.clerkId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Safely attach the user data to request
    req.user = { clerkId: token_decode.clerkId };

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authUser;
