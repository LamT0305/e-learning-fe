import { useEffect } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Space, Button } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import useStaff from "../../redux/hooks/useStaff";

function StaffDashboard() {
  const {
    allocations,
    dashboardStats,
    getDashboardStats,
    fetchAllocations,
    isLoading,
  } = useStaff();

  useEffect(() => {
    getDashboardStats();
    fetchAllocations();
  }, []);

  const columns = [
    {
      title: "Tutor",
      dataIndex: "tutor_id",
      key: "tutor",
      render: (tutor) => tutor.name,
    },
    {
      title: "Student",
      dataIndex: "student_id",
      key: "student",
      render: (student) => student.name,
    },
    {
      title: "Created At",
      dataIndex: "allocated_at",
      key: "allocated_at",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          />
        </Space>
      ),
    },
  ];

  console.log(allocations);

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
          dataSource={allocations?.map((allocation) => ({
            ...allocation,
            key: allocation._id,
          }))}
          rowKey="_id"
          loading={isLoading}
          className="h-[45vh] overflow-y-scroll"
        />
      </Card>
    </div>
  );
}

export default StaffDashboard;
