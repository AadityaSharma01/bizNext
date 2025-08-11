import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';

export const postRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ error: "Missing fields" });
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user dont exists" });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
        console.log("Password matched:", isMatch);

        // 3. Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24* 60 * 60 * 1000
        });

        // 4. Return token
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
}

export const getMe = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token, not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: "User approved", user: decoded });
    } catch (error) {
        res.status(401).json({ error: "inavlid token" })
    }
}

export const LogOut = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged Out" })
}

export const deleteUser = async (req, res) => {
    const token = req.cookies.token;
    console.log("received!")

    if (!token) return res.status(401).json({ error: "No token, not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await User.findByIdAndDelete(decoded.id)

        res.clearCookie("token");
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(401).json({ error: "inavlid token" })
    }
}