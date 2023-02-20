const express = require("express");
const { PostModel } = require("../Model/Post.model");

const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  const user = req.body.user;
    try {
      const PostData = await PostModel.find({ user });
      res.send(PostData);
    } catch (error) {
      res.send({ message: "Cannot get posts", error: error.message });
    }
});

PostRouter.get("/top", async (req, res) => {
  const user = req.body.user;
  try {
    const PostData = await PostModel.find({ user });
    if (PostData.length) {
      let max = 0;
      for (let i = 0; i < PostData.length; i++) {
        if (PostData[i].no_of_comments > max) {
          max = PostData[i].no_of_comments;
        }
      }
      const MaxCommentsPost = await PostModel.find({ no_of_comments: max });
      res.send(MaxCommentsPost);
    }
  } catch (error) {
    res.send({ message: "Cannot get posts", error: error.message });
  }
});

PostRouter.post("/create", async (req, res) => {
  try {
    const PostData = new PostModel(req.body);
    await PostData.save();
    res.send({ message: "Post has been added successfully" });
  } catch (error) {
    res.send({ message: "Cannot add posts", error: error.message });
  }
});

PostRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ message: "Post has been updated successfully" });
  } catch (error) {
    res.send({ message: "Cannot update posts", error: error.message });
  }
});

PostRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ message: "Post has been deleted successfully" });
  } catch (error) {
    res.send({ message: "Cannot delete posts", error: error.message });
  }
});

module.exports = { PostRouter };
