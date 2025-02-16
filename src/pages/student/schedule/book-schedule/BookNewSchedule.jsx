import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

function BookNewSchedule() {
  const [formData, setFormData] = useState({
    student: "User_name",
    tutor: "",
    duration: "90mins",
    meetingType: "Online",
    status: "Request",
    note: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };
  return (
    <div className="inner-page">
      <h2 style={{textDecoration: "underline"}}>Form submit new schedule: </h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label>
            Student:
            <input
              type="text"
              name="student"
              value={formData.student}
              readOnly
              className="input"
            />
          </label>

          <label>
            Tutor:
            <select name="tutor" onChange={handleChange} className="input">
              <option value="">Select tutor</option>
              <option value="Tutor 1">Tutor 1</option>
              <option value="Tutor 2">Tutor 2</option>
            </select>
          </label>

          <label>
            Duration:
            <input
              type="text"
              name="duration"
              value={formData.duration}
              readOnly
              className="input"
            />
          </label>

          <label>
            Meeting-type:
            <select
              name="meetingType"
              value={formData.meetingType}
              onChange={handleChange}
              className="input"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </label>

          <label>
            Status:
            <input
              type="text"
              name="status"
              value={formData.status}
              readOnly
              className="input"
            />
          </label>

          <label>
            Note:
            <textarea
              name="note"
              onChange={handleChange}
              className="input"
            ></textarea>
          </label>

          <label>
            Date:
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="input"
            />
          </label>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookNewSchedule;
