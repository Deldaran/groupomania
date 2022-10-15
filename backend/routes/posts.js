const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/Post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/',auth, postsCtrl.getAllPosts);
router.post('/',auth, multer, postsCtrl.createPost);

module.exports = router;