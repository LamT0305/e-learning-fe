import React, { useEffect, useState } from "react";
import "./style.css";
import useSchedule from "../../../../redux/hooks/useSchedule";

function ViewAllSchedule() {
  const [filter, setFilter] = useState("All");
  const {
    isLoading,
    schedules,
    totalPages,
    handleGetSchedules,
    handleDeleteSchedule,
  } = useSchedule();
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);

  useEffect(() => {
    if (filter === "All") {
      handleGetSchedules(null, currentPage);
    } else {
      handleGetSchedules(filter, currentPage);
    }
  }, [filter, currentPage]);

  const statusString = (status) => {
    switch (parseInt(status)) {
      case 0:
        return "Waiting";
      case 1:
        return "Scheduled";
      case -1:
        return "Rejected";
      default:
        break;
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNextPageClick = () => {
    if (endPage < totalPages) {
      setStartPage(startPage + 10);
      setEndPage(endPage + 10 > totalPages ? totalPages : endPage + 10);
    }
  };

  const handlePrevPageClick = () => {
    if (startPage > 1) {
      setStartPage(startPage - 10);
      setEndPage(endPage - 10 > 0 ? endPage - 10 : 10);
    }
  };

  const pages =
    totalPages <= 10
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        );

  console.log(schedules);
  return (
    <div
      className="inner-page"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="schedule-container">
        <header>
          <h2 style={{ textDecoration: "underline" }}>View all schedules</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="0">Waiting</option>
            <option value="1">Scheduled</option>
            <option value="-1">Rejected</option>
          </select>
        </header>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Meeting type</th>
              <th>Status</th>
              <th>Note</th>
              <th>Create at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule._id}>
                <td>{schedule.student.name}</td>
                <td>{schedule.tutor.name}</td>
                <td>{schedule.date}</td>
                <td>{schedule.duration}</td>
                <td>{schedule.meetingType}</td>
                <td>{statusString(schedule.status)}</td>
                <td>{schedule.note}</td>
                <td>{new Date(schedule.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteSchedule(schedule._id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pages">
        {/* Previous button */}
        <button onClick={handlePrevPageClick} disabled={startPage === 1}>
          &lt; Prev
        </button>

        {/* Render page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={page === currentPage}
            className={page === currentPage ? "page-btn-active" : "page-btn"}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button onClick={handleNextPageClick} disabled={endPage >= totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default ViewAllSchedule;
