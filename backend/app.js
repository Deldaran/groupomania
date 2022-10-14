const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const cors = require('cors')

const userRoutes = require('./routes/user');
const path = require('path');


const app = express();
app.use(express.json());

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

  //Permet la connection au server Mongodb
mongoose.connect('mongodb+srv://JorisFerrari:Yj32nx75@groupomania.np7s1gy.mongodb.net/test',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/post', (req, res, next) => {
    const post = [
      {
        Id: 1,
        postImage: "./assets/Gull_portrait_ca_usa.jpg",
        postImageDescription: 'description image',
        postTextarea: 'bienvenue voici mon text'
      },
      {
        Id: 2,
        postImage: "./assets/Gull_portrait_ca_usa.jpg",
        postImageDescription: 'description image',
        postTextarea: 'bienvenue voici mon 2eme text'
      },
    ];
    res.status(200).json(post);
  });

  app.use('/post', postRoutes);
  app.use('/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;