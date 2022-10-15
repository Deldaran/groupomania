const Post = require('../models/Post.js');
exports.createPost = (req, res, next)=>{
    console.log(req.body)
    const thingObject = req.body;
    const post = new Post({
        ...thingObject,
        userId: req.auth.userId,
        postImageDescription: 'description',
        //postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes:0 ,
        dislikes:0,
        usersLiked:'[]',
        usersDisliked:'[]'
    });
    post.save()
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