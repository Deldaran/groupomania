const Post = require('../models/Post.js');

exports.createPost = (req, res, next)=>{
    const thingObject = JSON.parse(req.body.post);
    delete thingObject._id;
    const post = new post({
        ...thingObject,
        userId: req.auth.userId,
        postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes:0 ,
        dislikes:0,
        usersLiked:'[]',
        usersDisliked:'[]'
    });
    sauce.save()
    .then(() => { res.status(201).json({message: 'post envoyé !'})})
    .catch(error => { res.status(400).json( { error })})
 };
 
 exports.getAllPosts = (req, res, next) => {
    Post.find().then(
      (things) => {

        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };