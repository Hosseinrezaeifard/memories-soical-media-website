//handle all the routers due to posts
import express from 'express';
import auth from '../middleware/auth.js'
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, getPost } from '../controllers/posts.js';

const router = express.Router()


router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost)
//patch is used for updating the existing post
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router