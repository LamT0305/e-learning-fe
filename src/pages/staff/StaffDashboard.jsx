import { useEffect } from "react";
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import useStaff from "../../redux/hooks/useStaff";

function StaffDashboard() {
  const { allocations, dashboardStats, getDashboardStats, fetchAllocations } =
    useStaff();

  useEffect(() => {
    getDashboardStats();
    fetchAllocations();
  }, []);

  const columns = [
    {
      title: "Tutor",
      dataIndex: ["tutor", "name"],
      key: "tutor",
    },
    {
      title: "Student",
      dataIndex: ["student", "name"],
      key: "student",
    },
    {
      title: "Date Allocated",
      dataIndex: "created_at",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="green">Active</Tag>,
    },
  ];

  return (
    <div className="dashboard-container">
      <h2>Staff Dashboard</h2>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Students"
              value={dashboardStats.totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Tutors"
              value={dashboardStats.totalTutors}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Allocations"
              value={dashboardStats.activeAllocations}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Allocations" style={{ marginBottom: 24 }}>
        <Table
          columns={columns}
          dataSource={allocations.slice(0, 5)}
          rowKey="_id"
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default StaffDashboard;
