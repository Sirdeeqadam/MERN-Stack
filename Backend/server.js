require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require('./routes/user')

// express app
const app = express();

// middleware
app.use(express.json());

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ DB connection error:", error);
  });

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
