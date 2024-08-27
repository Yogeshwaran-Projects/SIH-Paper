// pages/api/getUserId.js

import express from "express";
import db from "@/lib/db"; // Assuming you have a database utility

const app = express();

app.get("/api/getUserId", async (req, res) => {
  try {
    // Fetch user data from the database
    const user = await db.collection("users").findOne({ email: req.query.email }); // Adjust your query accordingly
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.uniqueId,
      email: user.email,
      profileLink: user.profileLink,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;