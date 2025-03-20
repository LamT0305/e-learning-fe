import React, { useEffect, useState } from "react";
import "./style.css";
import useBlog from "../../../redux/hooks/useBlog";

function BlogRequest() {
  const { isLoading, blogs, handleGetBlogRequest, handleApproveBlog } =
    useBlog();

  useEffect(() => {
    handleGetBlogRequest();
  }, []);

  return (
    <div className="inner-page">
      <div
        className="inner-page"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="blog-container">
          <h2 style={{ textDecoration: "underline", marginBottom: 20 }}>
            View all blogs request
          </h2>
          <ul className="blog-table">
            <ul className="tb-head">
              <li>Author</li>
              <li>Content</li>
              <li>Title</li>
              <li>Status</li>
              <li>Created At</li>
              <li>Actions</li>
            </ul>
            <ul className="tb-body">
              {blogs.map((blog) => (
                <ul className="tb-row" key={blog._id}>
                  <li>{blog.author_id.name}</li>
                  <li>
                    <div
                      className="blog-ct"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                  </li>
                  <li>{blog.title}</li>
                  <li>Waiting for approval</li>
                  <li>{new Date(blog.created_at).toLocaleString()}</li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      overflowX: "scroll",
                    }}
                  >
                    <button>
                      <i className="fa fa-eye"></i>
                    </button>
                    <button onClick={() => handleApproveBlog(blog._id, "0")}>
                      <i className="fa fa-check"></i>
                    </button>
                    <button onClick={() => handleApproveBlog(blog._id, "1")}>
                      <i className="fa fa-times"></i>
                    </button>
                  </li>
                </ul>
              ))}
            </ul>
          </ul>
        </div>

        {/* <div className="pages">
          <button onClick={handlePrevPageClick} disabled={startPage === 1}>
            &lt; Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={page === currentPage}
              className={page === currentPage ? "page-btn-active" : "page-btn"}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPageClick}
            disabled={endPage >= totalPages}
          >
            Next &gt;
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default BlogRequest;
