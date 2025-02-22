import React, { useEffect } from "react";
import useBlog from "../../../redux/hooks/useBlog";
import "./style.css";
import { Link } from "react-router-dom";

function BlogManagement() {
  const [filter, setFilter] = React.useState("");
  const { isLoading, blogs, handleMyBlogs, handleDeleteBlog } = useBlog();

  useEffect(() => {
    handleMyBlogs(filter);
  }, [filter]);

  console.log(blogs);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  const formatStatus = (status) => {
    const statusNumber = parseInt(status);
    switch (statusNumber) {
      case -1:
        return "Waiting for approval";
      case 0:
        return "Uploaded";
      default:
        return "Rejected";
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      handleDeleteBlog(id);
    }
  };

  return (
    <div className="inner-page">
      <div className="blog-container">
        <header>
          <h2 style={{ textDecoration: "underline" }}>View all blogs</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="-1">Waiting for approval</option>
            <option value="0">Approved</option>
            <option value="1">Rejected</option>
          </select>
        </header>
        <table
          className="blog-table"
          style={{ width: "100%", tableLayout: "auto" }}
        >
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Content</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.author_id.name}</td>
                <td>{blog.title}</td>
                <td className="content-cell">
                  {isHTML(blog.content) ? (
                    <div
                      style={{ wordBreak: "break-word" }}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  ) : (
                    blog.content
                  )}
                </td>
                <td>{formatStatus(blog.status_upload)}</td>
                <td style={{ width: "150px" }}>
                  {formatDate(blog.created_at)}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {/* update btn */}
                    <Link to={`/update-blog/${blog._id}`}>
                      <i
                        style={{ cursor: "pointer" }}
                        className="fa fa-edit"
                      ></i>
                    </Link>

                    {/* delete btn */}
                    <i
                      onClick={() => handleDelete(blog._id)}
                      style={{ cursor: "pointer" }}
                      className="fa fa-trash"
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogManagement;
