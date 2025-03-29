import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import { useParams, useNavigate } from "react-router-dom";
import useBlog from "../../../redux/hooks/useBlog";
import { Button, Input, message } from "antd";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const urlBackEnd = "http://localhost:3000";

  const {
    isLoading,
    handleUploadBlog,
    blog,
    handleGetBlogById,
    handleUpdateBlog,
  } = useBlog();

  useEffect(() => {
    if (editorRef.current) return;

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
      editorRef.current.root.innerHTML = "";
      editorRef.current.clipboard.dangerouslyPasteHTML(blog.content || "");
      setContent(blog.content || "");
      if (blog.image) {
        setImagePreview(`${urlBackEnd}${blog.image}`);
      }
    }
  }, [blog]);


  useEffect(() => {
    if (!id) {
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
      if (editorRef.current) {
        editorRef.current.root.innerHTML = "";
      }
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        message.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      message.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
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
      try {
        if (!id) {
          await handleUploadBlog(formData);
        } else {
          await handleUpdateBlog(id, formData);
        }
        // navigate("/blog-management");
      } catch (error) {
        message.error("Failed to save blog");
      }
    }
  };

  const getFullImagePath = (path) => {
    return path?.startsWith("http") ? path : `${urlBackEnd}${path}`;
  };

  return (
    <div className="w-full h-[80vh] overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Edit Blog" : "Create New Blog"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Title:</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog title"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mb-2"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Blog preview"
                className="max-w-md max-h-64 object-contain"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Content:</label>
          <div ref={quillRef} className="bg-white" />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading || !title.trim() || !content.trim()}
          className="mt-4"
          style={{ backgroundColor: "#1890ff" }}
        >
          {id ? "Update Blog" : "Create Blog"}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
