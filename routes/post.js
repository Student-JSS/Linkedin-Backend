const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const PostController = require('../controller/post');

router.post('/create', Authentication.auth, PostController.addPost);
router.post('/likeDislike', Authentication.auth, PostController.likeDislikePost);
router.get('/getAllPosts',  PostController.getAllPosts);
router.get('/getPostById/:postId', PostController.getPostByPostId);
router.get('/getTop5Posts/:userId', PostController.getTop5PostsForUser);
router.get('/getAllPostForUser/:userId', PostController.getAllPostForUser);
module.exports = router;