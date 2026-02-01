// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/testimonials", require("./routes/testimonial.routes"));

app.listen(4002, () => console.log("Server running on port 4002"));
