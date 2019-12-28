require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
const posts = [
  {
    username: "moo",
    title: "mooooo"
  },
  {
    username: "moo2",
    title: "mooooooooooo2"
  }
];

authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(process.env.ACCESS_TOKEN_SECRET);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/posts", authenticateToken, (req, res) => {
  console.log(req.user);
  res.json(posts.filter(post => post.username === req.user.name));
});

app.listen(3000);
