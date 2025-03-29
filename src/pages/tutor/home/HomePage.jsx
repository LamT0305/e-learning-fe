import React, { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Card, Input, Button, Tooltip, message } from "antd";
import avtImg from "../../../assets/avt.jpg";
import {
  SendOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useBlog from "../../../redux/hooks/useBlog";
import useComment from "../../../redux/hooks/useComment";
import useAuth from "../../../redux/hooks/useAuth";
import "./style.css";

const BASE_URL = "http://localhost:3000";

const BlogComment = memo(({ comment, blog, onEdit, onDelete, user }) => {
  const isUserAuthor =
    user &&
    (user._id === comment.author_id._id || blog.author_id._id === user._id);

  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <div className="comment-header">
          <Avatar src={avtImg} />
          <span className="font-semibold ml-3">{comment.author_id.name}</span>
        </div>
        <p className="w-full pl-11">{comment.content}</p>
      </div>
      {isUserAuthor && (
        <div className="cmt-action-btn">
          <Tooltip title="Edit">
            <EditOutlined onClick={() => onEdit(comment)} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined onClick={() => onDelete(comment._id)} />
          </Tooltip>
        </div>
      )}
    </div>
  );
});

const BlogPost = memo(
  ({
    blog,
    user,
    comments,
    openComments,
    onToggleComments,
    onCommentSubmit,
    onCommentEdit,
    onCommentDelete,
    commentText,
    onCommentChange,
    editComment,
  }) => {
    return (
      <Card className="w-[35vw] mb-8" key={blog._id}>
        <div className="blog-header">
          <Avatar src={avtImg} size={50} />
          <span className="text-md font-semibold ml-3">
            {blog.author_id.name}
          </span>
        </div>

        <div className="blog-content">
          <h3 className="text-start w-full py-3">{blog.title}</h3>
          {blog.image && (
            <img
              className="w-full h-auto rounded-lg"
              style={{ objectFit: "contain" }}
              src={`${BASE_URL}${blog.image}`}
              alt={blog.title}
              loading="lazy"
            />
          )}
          <Link to={`/tutor/blog/${blog._id}`} className="read-more">
            Read more
          </Link>
        </div>

        <div className="comment-section">
          <div className="comment-input">
            <Input
              placeholder={
                editComment ? "Edit your comment..." : "Write a comment..."
              }
              value={commentText[blog._id] || ""}
              onChange={(e) => onCommentChange(blog._id, e)}
              onPressEnter={() => onCommentSubmit(blog._id)}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => onCommentSubmit(blog._id)}
            />
          </div>

          <Button
            type="link"
            onClick={() => onToggleComments(blog._id)}
            icon={
              openComments[blog._id] ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )
            }
          >
            {openComments[blog._id] ? "Hide comments" : "View all comments"}
          </Button>

          {openComments[blog._id] && (
            <div className="comment-list">
              {comments[blog._id]?.map((comment) => (
                <BlogComment
                  key={comment._id}
                  comment={comment}
                  blog={blog}
                  user={user}
                  onEdit={(comment) => onCommentEdit(blog._id, comment)}
                  onDelete={(commentId) => onCommentDelete(blog._id, commentId)}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

function Blog() {
  const { blogs, handleGetBlogs } = useBlog();
  const {
    comments,
    handleGetComments,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  } = useComment();
  const { user, handleGetUser } = useAuth();

  const [openComments, setOpenComments] = useState({});
  const [editComment, setEditComment] = useState(null);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    handleGetBlogs();
    handleGetUser();
  }, []);

  const toggleComments = (blogId) => {
    setOpenComments((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
    if (!comments[blogId]) {
      handleGetComments(blogId);
    }
  };

  const handleCommentChange = useCallback((blogId, e) => {
    setCommentText((prev) => ({ ...prev, [blogId]: e.target.value }));
  }, []);

  const handleCommentSubmit = useCallback(
    (blogId) => {
      const content = commentText[blogId]?.trim();
      if (!content) {
        return message.error("Comment cannot be empty");
      }

      if (editComment) {
        handleUpdateComment(blogId, editComment, content);
        setEditComment(null);
      } else {
        handleAddComment(blogId, content);
      }
      setCommentText((prev) => ({ ...prev, [blogId]: "" }));
    },
    [editComment, handleAddComment, handleUpdateComment, commentText]
  );

  const handleCommentEdit = useCallback((blogId, comment) => {
    setEditComment(comment._id);
    setCommentText((prev) => ({ ...prev, [blogId]: comment.content }));
  }, []);

  if (!blogs.length) {
    return <div className="no-blogs">No blogs available.</div>;
  }

  return (
    <div className="w-full h-full overflow-y-auto m-[auto] flex flex-col items-center gap-8">
      <h2 className="text-2xl font-semibold mb-8 w-full text-start">Blogs</h2>
      {blogs.map((blog) => (
        <BlogPost
          key={blog._id}
          blog={blog}
          user={user}
          comments={comments}
          openComments={openComments}
          onToggleComments={toggleComments}
          onCommentSubmit={handleCommentSubmit}
          onCommentEdit={handleCommentEdit}
          onCommentDelete={handleDeleteComment}
          commentText={commentText}
          onCommentChange={handleCommentChange}
          editComment={editComment}
        />
      ))}
    </div>
  );
}

export default Blog;
