import React from "react";
import "./style.css";
import Blog from "../../../components/student-homepage/Blog/Blog";
import Tutor from "../../../components/student-homepage/Tutor/tutor/Tutor";
function HomePage() {
  return (
    <div className="w-full flex h-full">
      <Blog />
      {/* <Tutor /> */}
    </div>
  );
}

export default HomePage;
