const express = require("express");
const app = express();
const studentRoute = require("./routes/main");

// Connect To DB
require("./database/connectDB");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/api", studentRoute);

// Handle Unspecific Route
app.get("/", (req, res) => {
  res.send("<h3>404</h3>");
});

module.exports = app;
