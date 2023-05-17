const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signupRoutes = require("./signup");
const loginRoutes = require("./login");

require("dotenv").config();
const app = express();

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// parse JSON bodies
app.use(express.json());
app.use(cors());
// define routes
app.use("/user/signup", signupRoutes);
app.use("/user/login", loginRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start the server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
