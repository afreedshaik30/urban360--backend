// NEWS_API_KEY=03157df20f5d45eabd8f184a7e36fd90
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/news", async (req, res) => {
  try {
    const params = {
      country: "us",
      apiKey: process.env.NEWS_API_KEY,
    };
    if (req.query.category) {
      params.category = req.query.category;
    }

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
    });
    res.json(response.data);
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
