import express from "express";
import { search } from "./search.controller.js";

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Search endpoint
router.post("/search", search);

export default router;