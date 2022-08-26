const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const port = 3000;
app.set("view engine", "ejs");

const url = "mongodb://127.0.0.1:27017/Posts";
mongoose.connect(url);
const postSchema = new mongoose.Schema({
  title: String,
  message: String,
});
const Post = mongoose.model("Post", postSchema);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

var arr = [
  // { id: 1, name: "Sonia Malik" },
  // { id: 2, name: "Purav Malik" },
];
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/write", (req, res) => {
  res.render("create-post");
});
app.get("/output", (req, res) => {
  Post.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.send("no posts found!!");
    } else {
      console.log(result);
      res.render("output", { posts: result });
    }
  });
});
app.post("/see-post", (req, res) => {
  const individualPost = new Post({
    title: req.body.title,
    message: req.body.message,
  });
  individualPost.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.redirect("/output");
    }
  });
});
app.listen(port, (req, res) => {
  console.log(`The server is listening at port ${port}`);
});
