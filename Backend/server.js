require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS for local + Vercel
app.use(
  cors({
    origin: [
      "http://localhost:5173",              // local dev
      /\.vercel\.app$/                      // allow any Vercel subdomain
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ✅ Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// ✅ DB connection + server start
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection error:", error);
  });
