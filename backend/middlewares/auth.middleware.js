import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req?.cookies?.token;
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.id;
        next();
    } catch (err) {
        console.log("JWT error:", err.message);
        return res.status(401).json({ error: "Token invalid or expired" });
    }
};