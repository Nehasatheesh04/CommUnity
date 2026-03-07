import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const API = window.location.hostname === 'localhost' ? 'http://localhost:4000' : '';



const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/posts`);
      setPosts(response.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Community Feed</h1>
      </div>

      <PostForm onPostCreated={fetchPosts} />

      {loading ? (
        <div className="loading-screen">Loading posts...</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : posts.length === 0 ? (
        <div className="chat-empty">No posts yet. Be the first to share something!</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontWeight: "700", fontSize: "14px" }}>{post.username}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  {formatDate(post.createdAt)}
                </span>
              </div>

              <p className="post-card-desc" style={{ color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
                {post.caption}
              </p>

              {post.imageUrl && (
                <div style={{ marginTop: "16px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img
                    src={`${API}${post.imageUrl}`}
                    alt="Post content"
                    style={{ width: "100%", display: "block", maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
