import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBlogs,
  setLoading,
  deleteBlog,
  setBlogById,
  setTotalPages,
  setApproval,
} from "../slice/BlogSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../../utils/APIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useBlog = () => {
  const token = sessionStorage.getItem("token");
  const { blogs, isLoading, blog } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  let alertShown = false;
  const navigate = useNavigate();

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
        navigate("/");
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
      console.log(res);
      if (res.status === 201) {
        toast.success("Blog submitted successfully"); // Changed to success toast
        // navigate("/blog-management"); // Add navigation after success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload blog"); // Better error message
      if (error.response?.data?.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
        navigate("/");
      }
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
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
        toast.info(
          <div
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            <p>Updated blog successfully!</p>
          </div>,
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
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

  const setMyBlogs = async (status) => {
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

  const handleGetBlogRequest = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getBlogWaitingApproval, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setBlogs(res.data.blogs));
        dispatch(setTotalPages(res.data.totalPages));
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
        navigate("/");
      }
    }
    dispatch(setLoading(false));
  };

  const handleApproveBlog = async (id, status) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(id).blogApproval,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(setApproval(id));

        toast.info(
          <div
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {status === "0" ? (
              <p>Blog approved successfully!</p>
            ) : (
              <p>Blog Rejected!</p>
            )}
          </div>,
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
        navigate("/");
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
    setMyBlogs,
    handleGetBlogRequest,
    handleApproveBlog,
  };
};

export default useBlog;
