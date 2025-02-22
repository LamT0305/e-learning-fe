import React, { useRef, useEffect } from "react";
import "./style.css";

function Schedule() {
  const scheduleRef = useRef(null);

  useEffect(() => {
    const scheduleElement = scheduleRef.current;
    if (scheduleElement) {
      const onWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scheduleElement.scrollLeft += e.deltaY;
        }
      };
      scheduleElement.addEventListener("wheel", onWheel);
      return () => scheduleElement.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <div className="schedule">
      <p
        style={{
          color: "black",
          fontSize: 16,
          fontWeight: "900",
          marginBottom: 15,
        }}
      >
        Class Schedule
      </p>
      <div className="schedule-details" ref={scheduleRef}>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
        <div className="details">
          <div className="subject">
            <p>
              <strong>Subject: </strong>
            </p>
            <p>Math</p>
          </div>
          <div className="time">
            <p>
              <strong>Time: </strong>
            </p>
            <p>10:00 - 11:00</p>
          </div>
          <div className="date">
            <p>
              <strong>Date:</strong>{" "}
            </p>
            <p>Monday</p>
          </div>
          <div className="status">
            <p>
              <strong>Status: </strong>
            </p>
            <p>Accepted</p>
          </div>
          <button>Join Class</button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
