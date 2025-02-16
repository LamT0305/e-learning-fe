import React from "react";
import avt from "../../../assets/avt.jpg";
import blogImg from "../../../assets/blogImg.png";
import "./style.css";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="blog">
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
        <div
          style={{ padding: 20, borderRadius: 20, backgroundColor: "white" }}
        >
          <div className="blog-header">
            <img
              className="avt"
              src={avt}
              alt="avatar"
              width={50}
              height={50}
            />
            <p >Amanda</p>
          </div>
          <div className="blog-content">
            <p style={{fontSize:14}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
            <img className="blog-image" src={blogImg} alt="" />
            <Link to="/#" className="read-more">
              Click to read blog
            </Link>
          </div>
        </div>

        <div className="comment">
          <div className="comment-input">
            <input type="text" placeholder="Write a comment" />
            <div style={{ color: "blue", marginLeft:10, padding:8 }}>
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </div>
          </div>
          <div className="comment-list">
            <div className="comment-user">
              <img
                className="avt"
                src={avt}
                alt="avatar"
                width={50}
                height={50}
              />
              <p>Amanda</p>
            </div>
            <p className="comment-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
          <div className="comment-list">
            <div className="comment-user">
              <img
                className="avt"
                src={avt}
                alt="avatar"
                width={50}
                height={50}
              />
              <p>Amanda</p>
            </div>
            <p className="comment-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
