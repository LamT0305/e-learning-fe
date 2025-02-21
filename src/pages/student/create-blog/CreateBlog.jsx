import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import { useParams } from "react-router-dom";
import useBlog from "../../../redux/hooks/useBlog";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { id } = useParams();
  const urlBackEnd = "http://localhost:3000";

  const {
    isLoading,
    handleUploadBlog,
    blog,
    handleGetBlogById,
    handleUpdateBlog,
  } = useBlog();

  useEffect(() => {
    if (editorRef.current) return; // Prevent re-initialization

    editorRef.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
    });

    editorRef.current.on("text-change", () => {
      setContent(editorRef.current.root.innerHTML);
    });

    if (id) {
      handleGetBlogById(id);
    }
  }, []);

  useEffect(() => {
    if (blog && editorRef.current) {
      setTitle(blog.title || "");

      // Reset the editor content properly
      editorRef.current.root.innerHTML = ""; // Clear existing content
      editorRef.current.clipboard.dangerouslyPasteHTML(blog.content || "");

      setContent(blog.content || ""); // Update local state
    }
  }, [blog]);

  // clear data when navigating away from the page
  useEffect(() => {
    if (!id) {
      // Clear the form when moving to create mode
      setTitle("");
      setContent("");
      setImage(null);

      if (editorRef.current) {
        editorRef.current.root.innerHTML = ""; // Clear Quill content
      }
    }
  }, [id, blog]);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    const isConfirmed = window.confirm(
      !id
        ? "Are you sure you want to create a new blog?"
        : "Are you sure you want to update this blog?"
    );
    if (isConfirmed) {
      if (!id) {
        handleUploadBlog(formData);
      } else {
        handleUpdateBlog(id, formData);
      }
    }
  };

  const getFullImagePath = (path) => {
    return path.startsWith("http") ? path : `${urlBackEnd}${path}`;
  };
  return (
    <div className="inner-page">
      <div className="create-blog">
        <h2>Upload Blog</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <label style={{ marginRight: 20 }}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <label style={{ marginRight: 20 }}>Image:</label>
            <input type="file" onChange={handleImageChange} />
            {/* Show existing image if available */}
            {blog?.image && id && !image && (
              <img
                src={getFullImagePath(blog.image)}
                alt="Current Blog"
                style={{
                  width: 200,
                  height: 200,
                  marginLeft: 20,
                  objectFit: "cover",
                }}
              />
            )}

            {/* Show preview of newly selected image */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="New Blog"
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 20,
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div>
            <label>Content:</label>
            <div ref={quillRef} />
          </div>

          <button
            style={{ marginTop: 10, backgroundColor: "burlywood" }}
            type="submit"
          >
            {!id ? "Upload Blog" : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
