import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlog from "../redux/hooks/useBlog";
import { Avatar, Spin } from "antd";
import avtImg from "../assets/avt.jpg";

function ReadBlog() {
  const { id } = useParams();
  const { blog, handleGetBlogById, isLoading } = useBlog();

  useEffect(() => {
    if (id) handleGetBlogById(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center p-4">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl h-[85vh] overflow-auto mx-auto p-6">
      <div className="flex items-center mb-6">
        <Avatar src={avtImg} size={50} />
        <span className="ml-3 font-semibold">{blog.author_id?.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-6 text-gray-500">
        <span>Views: {blog.views}</span>
        <span className="ml-4">Likes: {blog.likeCount}</span>
      </div>
    </div>
  );
}

export default ReadBlog;
