require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

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
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
