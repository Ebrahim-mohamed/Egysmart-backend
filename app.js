// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4001",
  "https://egysmart.org",
  "https://api.egysmart.org",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/join", require("./routes/join.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/testimonials", require("./routes/testimonial.routes"));
app.use("/api/logos", require("./routes/logo.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

app.listen(4002, () => console.log("Server running on port 4002"));
