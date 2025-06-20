const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const postRoutes = require('./routes/posts');
// Add after app.use(express.json());
app.use('/api/posts', postRoutes);

// Create a post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
