const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors')


//model post
const postModel = mongoose.Schema({
    userId: {type: String, require: true},
    email: {type:String},
    postImage:{type: String,},
    postImageDescription:{type: String,},
    postTextarea:{type: String,require: true},
    isClicked :{type : Boolean,},
    likes: {type: Number},
    usersLiked:{type: [String]},
})

postModel.plugin(MongooseErrors);
module.exports = mongoose.model('Post',postModel);