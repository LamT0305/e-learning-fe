import React from "react";
import "./style.css";
import Blog from "../../../components/student-homepage/Blog/Blog";
import Tutor from "../../../components/student-homepage/Tutor/tutor/Tutor";
function HomePage() {
  return (
    <div className="inner-page">
      <div className="student-homepage">
        <Blog />
        <Tutor />
      </div>
    </div>
  );
}

export default HomePage;
