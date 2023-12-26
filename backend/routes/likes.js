import express from "express";
import { addlikes, deletelikes, getlikes } from "../controllers/like.js";

const router = express.Router();

router.get("/", getlikes);
router.post("/", addlikes);
router.delete("/", deletelikes);


export default router