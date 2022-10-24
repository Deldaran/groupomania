const Post = require('../models/Post.js');
const fs = require('fs');
const path = require('path')
const  mongoose = require('mongoose');
const { post, patch } = require('../routes/posts.js');

const adminUser = '63444c86b77c8f85d6ae68d5'
//Permet de créer un post
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
 //Permet de récuprer les informations d'un post 
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
 //permet de récuperer les postes
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
  // permet de supprimer un post
  exports.deletePost = async (req, res, next) => {
    await Post.findOne({ _id :req.params.id.replace(':','')})
    .then(thing => {
        if (thing.userId === req.auth.userId || req.auth.userId === adminUser) {
          const filename = thing.postImage.split('/images/')[1];
          console.log()
          fs.unlink(`images/${filename}`, async (err) => {
            if(err){
              res.status(500).json({ error: error });
            }
            await Post.deleteOne({ _id :req.params.id.replace(':','')})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }));
          });
        } else {
          res.status(401).json({message: 'Not authorized'});
        }
    })
    .catch( error => {
        res.status(500).json({ error: error });
    });
  };
  // permet de modifier un post
  exports.modifyPost = (req, res, next) => {
    
    const thingObject = req.file ? {
        ...JSON.parse(req.body.data),
        postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.data)};
    delete thingObject._userId;
    Post.findOne({_id: req.params.id.replace(':','')})
        .then((thing) => {
            if (thing.userId === req.auth.userId || req.auth.userId === adminUser) {
              Post.updateOne({ _id: req.params.id.replace(':','')}, { ...thingObject, _id: req.params.id.replace(':','')})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
            } else {
              res.status(401).json({ message : 'Not authorized'});
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
 //permet d'aimer un post
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
