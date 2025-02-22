import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBlogs,
  setLoading,
  deleteBlog,
  setBlogById,
} from "../slice/BlogSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../../utils/APIs";

const useBlog = () => {
  const token = sessionStorage.getItem("token");
  const { blogs, isLoading, blog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  let alertShown = false;

  const handleGetBlogs = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getAllBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setBlogs(res.data.blogs));
      }
    } catch (error) {
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

  const handleUploadBlog = async (formData) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(POST_API().uploadBlog, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("Uploaded blog successfully!");
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

  const handleDeleteBlog = async (blogId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.delete(DELETE_API(blogId).deleteBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("Blog deleted successfully!");

        dispatch(deleteBlog(blogId));
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

  const handleGetBlogById = async (blogId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API(blogId).getBlogById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setBlogById(res.data.blog));
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

  const handleUpdateBlog = async (blogId, formData) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(blogId).updateBlog,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Blog updated successfully!");
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

  const handleMyBlogs = async (status) => {
    dispatch(setLoading(true));
    try {
      console.log(status);
      const res = await axiosInstance.get(GET_API(0, 0, status).getMyBlogs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setBlogs(res.data.blogs));
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
  return {
    blog,
    isLoading,
    blogs,
    handleGetBlogs,
    handleUploadBlog,
    handleDeleteBlog,
    handleGetBlogById,
    handleUpdateBlog,
    handleMyBlogs,
  };
};

export default useBlog;
