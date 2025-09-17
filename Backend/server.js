require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

// ✅ Enable CORS (local + production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local dev
      "https://mern-stack-kohl-chi.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ✅ routes
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
    console.log("❌ DB connection error:", error);
  });
