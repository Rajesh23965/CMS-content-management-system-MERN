import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import router from "./routes/studentRoute.js";

const app = express();

// Middleware for logging the startup
app.use((req, res, next) => {
  console.log("Middleware setup successful");
  next();
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Logging incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/studentRecord", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use(
  "/api",
  (req, res, next) => {
    console.log("Router setup successful");
    next();
  },
  router
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
