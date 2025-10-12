import prisma from "../lib/prisma.js";
import { generateToken } from "../middlewares/auth.middleware.js";
import bcrypt from "bcryptjs"

export const checkAuth = async (req, res) => {
    try {
        // exclude password
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        // maxAge: 0 means the cookie will expire immediately upon being set.
        // When the browser sees a cookie with maxAge: 0, it deletes the cookie.
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfull" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: { email },
            include: { roles: true },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user, res);

        res.status(200).json({
            id: user.id,
            email: user.email,
            role: user.roles.name,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
