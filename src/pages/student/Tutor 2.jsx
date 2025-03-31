import React, { useEffect } from "react";
import { List, Avatar, Spin, Alert } from "antd";
import useStudent from "../../redux/hooks/useStudent";
import avt from "../../assets/avt.jpg";

function Tutor() {
  const { isLoading, assignedTutors, fetchAssignedTutors } = useStudent();

  useEffect(() => {
    fetchAssignedTutors();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!assignedTutors.length) {
    return <Alert message="No tutors assigned" type="info" showIcon />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={assignedTutors}
      renderItem={(tutor) => (
        <List.Item
          style={{ padding: "20px", borderBottom: "1px solid #f0f0f0" }}
        >
          <List.Item.Meta
            avatar={<Avatar src={avt} size={64} />}
            title={
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {tutor.name}
              </span>
            }
            description={
              <div style={{ marginTop: "10px" }}>
                {Object.entries(tutor).map(
                  ([key, value]) =>
                    key !== "avatar" &&
                    key !== "role" && (
                      <p key={key} style={{ margin: "5px 0", color: "#555" }}>
                        <span style={{ fontWeight: "bold" }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>{" "}
                        {key.includes("date") ||
                        key.includes("created_at") ||
                        key.includes("updated_at")
                          ? new Date(value).toLocaleString()
                          : value.toString()}
                      </p>
                    )
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default Tutor;
