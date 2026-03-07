import React, { useState } from "react";
import axios from "axios";

const API = window.location.hostname === 'localhost' ? 'http://localhost:4000' : '';



const PostForm = ({ onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      setError("Caption is required.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("cu_token");
      await axios.post(`${API}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setCaption("");
      setImage(null);
      // Reset file input
      document.getElementById("post-image-input").value = "";

      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "100%", marginBottom: "40px", padding: "24px" }}>
      <h2 className="card-title" style={{ fontSize: "18px" }}>Create Post</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-input"
            placeholder="Share your thoughts, ask for help..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            style={{ resize: "none" }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="post-image-input">
            Upload Image (Optional)
          </label>
          <input
            id="post-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
            style={{ padding: "8px" }}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;