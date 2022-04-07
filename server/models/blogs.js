import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
title: String,
  description: String,
  tags: [String],
  fileUpload: String,
  upvote: {
    type: Number,
    default: 0,
  },
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

var blogPost = mongoose.model("blogArticle", blogSchema)

export default blogPost;