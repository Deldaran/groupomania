const Post = require('../models/Post.js');
const fs = require('fs');
const  mongoose = require('mongoose');
const { post } = require('../routes/posts.js');

exports.createPost = (req, res, next)=>{
    const thingObject = JSON.parse(req.body.data);
    delete thingObject._id;
    const post = new Post({
        ...thingObject,
        userId: req.auth.userId,
        postImageDescription: 'description',
        postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        isClicked : false,
        likes:0 ,
        usersLiked:'[]',
    });
    post.save()
    .then(() => { res.status(201).json({message: 'post envoyé !'})})
    .catch(error => { res.status(400).json( { error })})
 };
 exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id :req.params.id.replace(':','')})
  .then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
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
            //problème de chemin 
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
  exports.modifyPost = (req, res, next) => {
    
    const thingObject = req.file ? {
        ...JSON.parse(req.body.data),
        postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.data)};
    delete thingObject._userId;
    Post.findOne({_id: req.params.id.replace(':','')})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Post.updateOne({ _id: req.params.id.replace(':','')}, { ...thingObject, _id: req.params.id.replace(':','')})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
 exports.likePost = (req, res, next) => {
  const PostId = req.params.id.replace(':','');
  const isClicked = req.body.isClicked;
  const userId = req.body.userId;
  const like = req.body.like;
  Post.findOne({ _id: PostId })
  .then((post)=> {
    if (like === 1 && !post.usersLiked.includes(userId)) {
      Post.updateOne(
        { _id: PostId },
        {
          $inc: {likes: +1 },
          $set: {isClicked : isClicked },
          $push: { usersLiked: userId },
        }
      )
      .then((post) => res.status(200).json({ message: "Post appréciée" }))
      .catch((error) => res.status(500).json({ error }));

    }
  else {
        if (post.usersLiked.includes(userId)) {
          Post.updateOne(
            { _id: PostId },
            { $pull: { usersLiked: userId },
            $set: {isClicked : !isClicked },
              $inc: { likes: -1 } 
              }
          )
            .then((Post) => {
              res.status(200).json({ message: "Post dépréciée" });
            })
            .catch((error) => res.status(500).json({ error }));
        }
  }
})}
