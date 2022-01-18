import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

//this is going to be a function which is required for our middleware to work
//this function is going to apply and happen on each one of our requests
//this function sends back the token of the user to backend so the backend middleware verify that we actually logged in
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (FormData) => API.post('/user/signin', FormData)
export const signup = (FormData) => API.post('/user/signup', FormData)