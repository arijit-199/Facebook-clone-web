import jwt from "jsonwebtoken";
import { db } from "../database.js";
import moment from "moment";



export const getPosts = (req, res) => {
    
 const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        
        const q = userId ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC` : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p INNER JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`;


        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data.map((item) => item));
        });
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

        const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

        const values = [
            req.body.desc, 
            req.body.img,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), 
        ]
    
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
    
            return res.status(200).json("Your post has been added");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

        const q = "DELETE FROM posts WHERE id = ?";
        
        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
    
            return res.status(200).json("Post has been deleted");
        });
    });
};
