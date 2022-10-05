const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/Post');

const multer = require('../middleware/multer-config')

router.get('/', postsCtrl.getAllPosts);
router.post('/', multer, postsCtrl.createPost);

module.exports = router;