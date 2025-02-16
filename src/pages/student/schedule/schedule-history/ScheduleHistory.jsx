import React, { useState } from "react";
import "./style.css";

function ScheduleHistory() {
  const [filter, setFilter] = useState("All");

  const schedules = [
    {
      id: 1,
      student: "John Doe",
      tutor: "Jane Smith",
      date: "2025-02-17",
      duration: "1 hour",
      status: "Scheduled",
      note: "Bring textbook",
      createdAt: "2025-02-01T10:00:00Z",
    },
    {
      id: 2,
      student: "Alice Johnson",
      tutor: "Bob Brown",
      date: "2025-02-18",
      duration: "1.5 hours",
      status: "Completed",
      note: "Review notes",
      createdAt: "2025-02-02T11:00:00Z",
    },
    {
      id: 3,
      student: "Charlie Davis",
      tutor: "Eve White",
      date: "2025-02-19",
      duration: "2 hours",
      status: "Cancelled",
      note: "Reschedule",
      createdAt: "2025-02-03T13:00:00Z",
    },
  ];
  return (
    <div className="inner-page">
      <div className="schedule-container">
        <header>
          <h2 style={{ textDecoration: "underline" }}>Schedule history</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </header>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Note</th>
              <th>Create at</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.student}</td>
                <td>{schedule.tutor}</td>
                <td>{schedule.date}</td>
                <td>{schedule.duration}</td>
                <td>{schedule.status}</td>
                <td>{schedule.note}</td>
                <td>{new Date(schedule.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleHistory;
