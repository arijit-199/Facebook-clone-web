import { db } from "../database.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE id=?";
    const userId = req.params.userId;

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];

        return res.status(200).json(info);
    })
};

export const updateUser = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

        const q = "UPDATE users SET `name`=?, `username`=?, `email`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id = ?";

        db.query(q, [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("User updated successfully");
            return res.status(403).json("You can only update your info!");
        })
    })
};