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

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <div className="flex items-center">
            <label className="relative cursor-pointer">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Image</span>
              </div>
            </label>
          </div>
          
          {imagePreview && (
            <div className="mt-4 relative group w-fit">
              <img
                src={imagePreview}
                alt="Blog preview"
                className="w-full max-w-2xl  rounded-lg shadow-lg object-contain max-h-80 border border-gray-200"
              />
              <div 
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
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
