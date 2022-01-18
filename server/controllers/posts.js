import { json } from 'express'
import mongoose from 'mongoose'
import Post from "../models/postMessage.js"

//handle all the routers functionality and logic due to posts

export const getPosts = async (req, res) => {
    const { page } = req.query
    try {

        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Post.countDocuments({})
        //id:-1 is going to give us th newest one
        const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const getPost = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

        const post = await Post.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
/*
Differences between query and params 
=> query is like => /posts/?page=1 ==> page = 1
=> params is like => /posts/123 ==> post = 123
*/
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query

    try {
        console.log(searchQuery)
        console.log(tags.split(','))
        const title = new RegExp(searchQuery, 'i')
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        res.json({ data: posts })
    } catch (error) {
        // console.log(error)
        res.status(404).json({ error: error })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    //we can rename our params as well
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await Post.findByIdAndRemove(id)
    console.log("done")
    res.json({ message: "Post deleted Successfully" })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: 'Unauthenticated!' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await Post.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost)
}