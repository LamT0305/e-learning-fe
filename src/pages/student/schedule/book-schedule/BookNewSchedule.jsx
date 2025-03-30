import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import useAuth from "../../../../redux/hooks/useAuth";
import useSchedule from "../../../../redux/hooks/useSchedule";

function BookNewSchedule() {
  const [formData, setFormData] = useState({
    receiver_id: "",
    duration: "",
    meetingType: "online",
    note: "",
    subject: "",
    date: new Date(),
  });

  const { user, handleGetUser } = useAuth();
  const { isLoading, handleCreateNewSchedule } = useSchedule();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateToYYYYMMDD = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.duration !== "" &&
      formData.receiver_id !== "" &&
      formData.subject !== ""
    ) {
      const dateFormat = formatDateToYYYYMMDD(formData.date);
      formData.date = dateFormat;
      handleCreateNewSchedule(formData);
      setFormData({
        receiver_id: "",
        duration: "",
        meetingType: "online",
        note: "",
        subject: "",
        date: new Date(),
      });
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className="inner-page">
      <div className="book-schedule">
        <h2 style={{ textDecoration: "underline", margin: 0 }}>
          Form submit new schedule:{" "}
        </h2>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: "30%" }}>
                <label>
                  Sender:
                  <input
                    type="text"
                    name="student"
                    value={user.user_id?.name || ""}
                    readOnly
                    className="input"
                  />
                </label>

                <label>
                  Receiver:
                  <select
                    name="receiver_id"
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select tutor</option>
                    {user.tutor_ids?.map((tutor) => (
                      <option value={tutor.user_id._id} key={tutor.user_id._id}>
                        {tutor.user_id.name}
                      </option>
                    ))}
                    <option value="Tutor 2">Tutor 2</option>
                  </select>
                </label>

                <label>
                  Duration:
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input"
                    required
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
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </label>

                <label>
                  Subject:
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input"
                  />
                </label>

                <label>
                  Note:
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="input"
                  ></textarea>
                </label>
              </div>

              <label>
                Date:
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  className="input"
                  dateFormat="yyyy-MM-dd"
                />
              </label>
            </div>

            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookNewSchedule;
