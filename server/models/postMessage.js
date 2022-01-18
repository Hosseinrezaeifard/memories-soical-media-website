import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    name: String,
    title: String,
    message: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;