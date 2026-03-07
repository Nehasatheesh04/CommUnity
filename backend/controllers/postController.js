import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  const { caption } = req.body;
  const { _id: userId, name: username } = req.user;

  if (!caption) {
    return res.status(400).json({ success: false, message: "Caption is required." });
  }

  try {
    let imageUrl = "";
    if (req.file) {
      // Store the relative path to be served statically
      imageUrl = `/uploads/posts/${req.file.filename}`;
    }

    const newPost = new Post({
      userId,
      username,
      caption,
      imageUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "An error occurred while creating the post." });
  }
};

// Fetch all posts (newest first)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "An error occurred while fetching posts." });
  }
};

// Fetch posts by a specific user
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ success: false, message: "An error occurred while fetching user posts." });
  }
};
