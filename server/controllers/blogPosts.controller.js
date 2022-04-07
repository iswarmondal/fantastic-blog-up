import express from "express";
import mongoose from "mongoose";

import BlogPost from "../models/blogs.js";

const router = express.Router();

// GET ALL THE BLOG POSTS
export const getAllBlogPosts = async (req, res)=>{
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// ADD SINGLE BLOG POST
export const addBlogPost = async(req, res) =>{
    const { title, description, fileUpload, creator, tags } = req.body;

    const createNewPost = new BlogPost({
        title, 
        description, 
        fileUpload, 
        creator, 
        tags
    })

    try {
        await createNewPost.save();
        res.send(201).json(createNewPost);
    } catch (error) {
        res.send(409).json({message: error.message});
    }
}

// GET SINGLE BLOG POSTS
export const getSinglePost = async (req, res)=>{
    const { id }= req.params;

    try {
        const singlePost = BlogPost.findById(id);
        res.send(200).json(singlePost);
    } catch (error) {
        res.send(404).json({message: error.message})
    }
}

// UPDATE SINGLE BLOG POST
export const updateSingleBlogPost = async (req, res)=>{
    const {id} = req.params;
    const {title, description, creator, fileUpload, tags} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`post ${id} not found`);

    const updateBlogPosts = {
        creator,
        title,
        description,
        tags,
        fileUpload,
        _id: id
    }

    await BlogPost.findByIdAndUpdate(id, updateBlogPosts, {new: true})

    res.json(updateBlogPosts)
}

// REMOVE SINGLE BLOG
export const removeSingleBlogPost = async (req, res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`post ${id} not found`);
    
    await BlogPost.findByIdAndRemove(id);

    res.json({message: "Successfully deleted"});
}

// LIKE/UPVOTING OF A SINGLE BLOG POST
export const likeBlogPost = async (req, res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const post = await BlogPost.findById(id);

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, { upvote: post.upvote + 1 }, {new: true});

    res.json(updatedBlogPost);
}
export default router;