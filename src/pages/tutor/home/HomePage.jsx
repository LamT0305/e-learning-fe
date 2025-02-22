import React, { useEffect, useState } from "react";
import avt from "../../../assets/avt.jpg";
import "./style.css";
import { Link } from "react-router-dom";
import useAuth from "../../../redux/hooks/useAuth";
import useBlog from "../../../redux/hooks/useBlog";
import useComment from "../../../redux/hooks/useComment";

const BASE_URL = "http://localhost:3000";

function HomePage() {
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
    setOpenComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
    if (!openComments[blogId]) handleGetComments(blogId);
  };

  const handleChange = (blogId, e) => {
    setCommentText({ ...commentText, [blogId]: e.target.value });
  };

  const handleEditClick = (blogId, comment) => {
    setEditComment(comment._id);
    setCommentText({ ...commentText, [blogId]: comment.content });
  };

  const handleSubmit = (blogId) => {
    if (editComment) {
      handleUpdateComment(blogId, editComment, commentText[blogId]);
      setEditComment(null);
    } else {
      handleAddComment(blogId, commentText[blogId] || "");
    }
    setCommentText({ ...commentText, [blogId]: "" });
  };

  const isUserAuthor = (comment, blog) =>
    user &&
    (user.user_id._id === comment.author_id._id ||
      blog.author_id._id === user.user_id._id);

  return (
    <div className="inner-page">
      <div className="container">
        <div className="blog-tutor">
          <h1
            style={{
              fontSize: 40,
              color: "black",
              textDecoration: "underline",
              marginBottom: 50,
            }}
          >
            Blogs
          </h1>
          <div>
            {blogs.map((blog) => (
              <div key={blog._id} style={{ marginTop: 20 }}>
                <div
                  style={{
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                >
                  <div className="blog-header">
                    <img
                      className="avt"
                      src={avt}
                      alt="avatar"
                      width={50}
                      height={50}
                    />
                    <p>{blog.author_id.name}</p>
                  </div>
                  <div className="blog-content">
                    <p style={{ fontSize: 14 }}>{blog.title}</p>
                    <img
                      className="blog-image-tutor"
                      src={`${BASE_URL}${blog.image}`}
                      alt=""
                      style={{ width: "250px !important" }}
                    />
                    <Link to="/#" className="read-more">
                      Click to read blog
                    </Link>
                  </div>
                </div>

                <div className="comment">
                  {/* Input Field for Adding/Editing Comments */}
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder={
                        editComment
                          ? "Edit your comment..."
                          : "Write a comment..."
                      }
                      value={commentText[blog._id] || ""}
                      onChange={(event) => handleChange(blog._id, event)}
                    />
                    <div
                      style={{ color: "blue", marginLeft: 10, padding: 8 }}
                      onClick={() => handleSubmit(blog._id)}
                    >
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </div>
                  </div>

                  {/* Toggle Comment Section */}
                  <div className="view-cmt-btn" style={{ cursor: "pointer" }}>
                    {!openComments[blog._id] ? (
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => toggleComments(blog._id)}
                      >
                        <p style={{ marginRight: 10 }}>View all comments</p>
                        <i className="fa fa-caret-down"></i>
                      </div>
                    ) : (
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => toggleComments(blog._id)}
                      >
                        <p style={{ marginRight: 10 }}>Hide comments</p>
                        <i className="fa fa-caret-up"></i>
                      </div>
                    )}
                  </div>

                  {/* Display Comments */}
                  {openComments[blog._id] && (
                    <div className="comment-list">
                      {comments[blog._id]?.map((comment) => (
                        <div key={comment._id} className="comment-user">
                          <div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                className="avt"
                                src={avt}
                                alt="avatar"
                                width={50}
                                height={50}
                              />
                              <p style={{ textDecoration: "underline" }}>
                                {comment.author_id.name}
                              </p>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                          </div>

                          {/* Action Buttons */}
                          {isUserAuthor(comment, blog) && (
                            <div className="cmt-action-btn">
                              <i
                                className="fa fa-edit"
                                onClick={() =>
                                  handleEditClick(blog._id, comment)
                                }
                              ></i>
                              <i
                                className="fa fa-trash"
                                onClick={() =>
                                  handleDeleteComment(blog._id, comment._id)
                                }
                              ></i>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
