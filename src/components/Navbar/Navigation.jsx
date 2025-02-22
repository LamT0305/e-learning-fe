import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../redux/hooks/useAuth";

function Navigation() {
  const [open, setOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);

  const { handleLogout } = useAuth();

  const Role_name = sessionStorage.getItem("role_name");
  return (
    <nav className="navigation">
      <ul>
        <li style={{ backgroundColor: "#1e3a8a", fontWeight: "900" }}>
          <p
            style={{
              margin: 0,
              padding: "14px",
              color: "white",
            }}
          >
            Dashboard
          </p>
        </li>
        <li>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">Blogs</Link>
            {openBlog ? (
              <button
                style={{ padding: "5px 12px" }}
                onClick={() => setOpenBlog(!openBlog)}
              >
                <i className="fa fa-caret-up"></i>
              </button>
            ) : (
              <button
                style={{ padding: "5px 12px" }}
                onClick={() => setOpenBlog(!openBlog)}
              >
                <i className="fa fa-caret-down"></i>
              </button>
            )}
          </div>

          {openBlog && (
            <div style={{ backgroundColor: "#ccc" }}>
              {Role_name === "Student" ? (
                <>
                  <Link to="/create-blog">Create Blog</Link>
                  <Link to="/blog-management">Blog Management</Link>
                </>
              ) : (
                <Link to="/view-blog-request">View Blog Requests</Link>
              )}
            </div>
          )}
        </li>
        <li>
          <Link
            to={
              Role_name === "Student" ? "/student-messages" : "/tutor-messages"
            }
          >
            Messages
          </Link>
        </li>
        <li>
          <Link
            to={
              Role_name === "Student"
                ? "/student-notifications"
                : "/tutor-notifications"
            }
          >
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/contact">Progress and report</Link>
        </li>
        <li className="dropdown">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to={
                Role_name === "Student"
                  ? "/view-student-schedules"
                  : "/view-tutor-schedules"
              }
              className="dropbtn"
            >
              Schedule
            </Link>
            {Role_name === "Student" ? (
              <>
                {open ? (
                  <button
                    style={{ padding: "5px 12px" }}
                    onClick={() => setOpen(!open)}
                  >
                    <i className="fa fa-caret-up"></i>
                  </button>
                ) : (
                  <button
                    style={{ padding: "5px 12px" }}
                    onClick={() => setOpen(!open)}
                  >
                    <i className="fa fa-caret-down"></i>
                  </button>
                )}
              </>
            ) : null}
          </div>

          {open ? (
            <div className="dropdown-content">
              <Link to="/book-new-schedule">Book new schedule</Link>
            </div>
          ) : null}
        </li>
        <li>
          <Link to={"/"} onClick={() => handleLogout()}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
