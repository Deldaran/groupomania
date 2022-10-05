const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors')


//model post
const posteModel = mongoose.Schema({
    userId: {type: String, require: true},
    postImage:{type: String},
    likes: {type: Number},
    dislikes:{type: Number},
    usersLiked:{type: [String]},
    usersDisliked:{type: [String]}
})