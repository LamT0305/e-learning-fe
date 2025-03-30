// src/redux/hooks/useComment.js
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setComments,
  addComment,
  deleteComment,
  updateComment,
} from "../slice/CommentSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../../utils/APIs";

const useComment = () => {
  const token = sessionStorage.getItem("token");
  const { isLoading, comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  let alertShown = false;

  const handleGetComments = async (blogId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API(blogId, 0, 0).getAllCmts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setComments({ blogId, comments: res.data.comments })); // Dispatch comments with blog ID
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleAddComment = async (blogId, content) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        POST_API(blogId).commentBlog,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        await handleGetComments(blogId);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleDeleteComment = async (blogId, commentId) => {
    dispatch(setLoading(true));
    try {
      const cf = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (cf) {
        const res = await axiosInstance.delete(
          DELETE_API(commentId).deleteComment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          const payload = { blogId, commentId };
          dispatch(deleteComment(payload));
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleUpdateComment = async (blogId, commentId, content) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(commentId).updateComment,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const payload = { blogId, commentId, newContent: content };
        dispatch(updateComment(payload));
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
  };
  return {
    isLoading,
    comments,
    handleGetComments,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  };
};

export default useComment;
