const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors')


//model post
const postModel = mongoose.Schema({
    userId: {type: String, require: true},
    postImage:{type: String},
    postImageDescription:{type: String,require: true},
    postTextarea:{type: String,require: true},
    likes: {type: Number},
    dislikes:{type: Number},
    usersLiked:{type: [String]},
    usersDisliked:{type: [String]}
})

postModel.plugin(MongooseErrors);
module.exports = mongoose.model('Post',postModel);