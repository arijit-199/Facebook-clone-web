import { db } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const register = (req, res) => {
    // CHECKING EXISTING USER
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) return res.status(409).json("User already exists!");

        // CREATE A NEW USER
        // HASH THE PASSWORD
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`name`, `username`, `email`, `password`) VALUE(?)";

        const values = [
            req.body.name,
            req.body.username,
            req.body.email,
            hashedPassword,
        ] 

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("User created successfully");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        // CHECK PASSWORD
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong username or password!");
 
        const token = jwt.sign({id: data[0].id}, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logged out.");
}