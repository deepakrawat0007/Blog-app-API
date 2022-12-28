const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const PostModel = new Schema({
    image:{type:String , required:true},
    title:{type:String , required:true},
    description:{type:String , required:true},
    author:{type:String , required:true},
    user:{type:ObjectId , required:true}
},{timestamps:true})

const Post = mongoose.model('posts' , PostModel)

module.exports = Post