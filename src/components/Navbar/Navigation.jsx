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
              padding: "14px 35px",
              color: "white",
            }}
          >
            Dashboard
          </p>
        </li>
        <li>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">Blogs</Link>
            <button style={{ padding: "5px 12px" }}>
              {openBlog ? (
                <i
                  className="fa fa-caret-up"
                  onClick={() => setOpenBlog(!openBlog)}
                ></i>
              ) : (
                <i
                  className="fa fa-caret-down"
                  onClick={() => setOpenBlog(!openBlog)}
                ></i>
              )}
            </button>
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
            <button style={{ padding: "5px 12px" }}>
              {open ? (
                <i
                  className="fa fa-caret-up"
                  onClick={() => setOpen(!open)}
                ></i>
              ) : (
                <i
                  className="fa fa-caret-down"
                  onClick={() => setOpen(!open)}
                ></i>
              )}
            </button>
          </div>

          {open ? (
            <div className="dropdown-content">
              <Link to="/view-schedules">View all schedules</Link>
              <Link to="/book-new-schedule">Book new schedule</Link>
              <Link to="/schedule-history">Schedule History</Link>
            </div>
          ) : null}
        </li>
        <li>
          <Link to={"/"} onClick={() =>handleLogout()}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
