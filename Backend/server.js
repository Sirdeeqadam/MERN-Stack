require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS for local + any Vercel subdomain
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow requests with no origin (Postman, curl)

      const allowedOrigins = ["http://localhost:5173"];
      const vercelRegex = /\.vercel\.app$/;

      if (allowedOrigins.includes(origin) || vercelRegex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ allows cookies/auth headers
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
