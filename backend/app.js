const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/post', (req, res, next) => {
    const post = [
      {
        Id: 1,
        postImage: "../assets/Gull_portrait_ca_usa.jpg",
        postImageDescription: 'description image',
        postTextarea: 'bienvenue voici mon text'
      },
      {
        Id: 1,
        postImage: "../assets/Gull_portrait_ca_usa.jpg",
        postImageDescription: 'description image',
        postTextarea: 'bienvenue voici mon 2eme text'
      },
    ];
    res.status(200).json(post);
  });

module.exports = app;