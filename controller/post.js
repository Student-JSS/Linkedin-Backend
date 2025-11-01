const PostModel = require('../model/post');

exports.addPost = async (req, res) => {
    try {
        const { desc, imageLink } = req.body;
        const userId = req.user._id;

        const addPost = new PostModel({ user: userId, desc, imageLink });

        if(!addPost){
            return  res.status(400).json({ error: 'Unable to create post' });
        }
        await addPost.save();
        return res.status(201).json({ message: 'Post created successfully', post: addPost });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });

    }
}

exports.likeDislikePost = async (req, res) => {
    try {
        const { selfId } = req.user._id;
        const  {postId } = req.body;
        let post = await PostModel.findById(postId);
        if(!post){
            return res.status(400).json({error: 'Post not found'});
        }
        const index = post.likes.findIndex(id => id.equals(selfId));
        if(index === -1){
            post.likes.push(selfId);
            await post.save();
            return res.status(200).json({message: 'Post liked', post});
        } else {
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({message: 'Post disliked', post});
        }

        await post.save();
        res.status(200).json({ 
            message: index !=-1 ? 'post unliked:' :'post liked',
            likes:post.likes
         });

    }  catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        let posts = await PostModel.find().populate('user', '-passsword').sort({ createdAt: -1 });
        res.status(200).json({ message: 'Posts fetched successfully',
         posts: posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
} 

exports.getPostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).populate('user', '-password');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({ 
            message: 'Post fetched successfully',
            post: post 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getTop5PostsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', '-password');
            return res.status(200).json({
            message: 'Top 5 posts fetched successfully',
            posts: posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

exports.getAllPostForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', '-password');
            return res.status(200).json({
            message: 'Top 5 posts fetched successfully',
            posts: posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}
        