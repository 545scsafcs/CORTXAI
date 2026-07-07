import express from "express";
import { chatWithNora } from "../controllers/noraController.js";

const router = express.Router();

router.post("/chat", chatWithNora);

export default router;