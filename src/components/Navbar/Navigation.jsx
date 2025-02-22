import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../redux/hooks/useAuth";

function Navigation() {
  const [open, setOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);

  const { handleLogout } = useAuth();
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

          {openBlog ? (
            <div style={{ backgroundColor: "#ccc" }}>
              <Link to="/create-blog">Create Blog</Link>
              <Link to={"/blog-management"}>Blog management</Link>
            </div>
          ) : null}
        </li>
        <li>
          <Link to="/student-messages">Messages</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/contact">Progress and report</Link>
        </li>
        <li className="dropdown">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/view-schedules" className="dropbtn">
              Schedule
            </Link>
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
