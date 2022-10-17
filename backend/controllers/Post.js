const Post = require('../models/Post.js');
const fs = require('fs');
const  mongoose = require('mongoose');

exports.createPost = (req, res, next)=>{
    const thingObject = JSON.parse(req.body.data);
    delete thingObject._id;
    const post = new Post({
        ...thingObject,
        userId: req.auth.userId,
        postImageDescription: 'description',
        postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
  exports.deletePost = async (req, res, next) => {
    await Post.findOne({ _id :req.params.id.replace(':','')})
    .then(thing => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = thing.postImage.split('/images/')[1];
            fs.unlink(`images/${filename}`, async () => {
                await Post.deleteOne({ _id :req.params.id.replace(':','')})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error: error });
    });
  };