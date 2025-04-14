import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Select, Spin, Alert } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import useAnalytic from "../../redux/hooks/useAnalytic";
import useAllocation from "../../redux/hooks/useAllocation";
import { Column } from "@ant-design/plots";

const AnalyticDashBoard = () => {
  const {
    isLoading: analyticsLoading,
    studentAnalytics,
    error: analyticsError,
    handleGetStudentAnalytics,
    handleClearAnalytics,
  } = useAnalytic();

  const {
    allocatedStudents,
    isLoading: studentsLoading,
    error: studentsError,
    fetchAllocatedStudents,
  } = useAllocation();

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchAllocatedStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      handleGetStudentAnalytics(selectedStudent);
    }
    return () => handleClearAnalytics();
  }, [selectedStudent]);

  const handleStudentChange = (value) => {
    setSelectedStudent(value);
  };

  if (analyticsError || studentsError) {
    return <Alert type="error" message={analyticsError || studentsError} />;
  }

  const processSessionData = (data) => {
    if (!data) return [];
    return data.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sessions: Number(item.count) || 0,
    }));
  };

  const dailyData = processSessionData(studentAnalytics?.sessions_over_time);

  console.log(studentAnalytics);
  return (
    <div className="p-6 h-[85vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Student Analytics Dashboard</h2>

      <Select
        className="w-full mb-6"
        placeholder="Select a student"
        onChange={handleStudentChange}
        loading={studentsLoading}
        value={selectedStudent}
      >
        {allocatedStudents?.map((student) => (
          <Select.Option key={student._id} value={student.student_id._id}>
            {student.student_id.name}
          </Select.Option>
        ))}
      </Select>

      {analyticsLoading || studentsLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : studentAnalytics ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Sessions"
                  value={studentAnalytics.total_sessions || 0}
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Blogs"
                  value={studentAnalytics.total_blogs || 0}
                  prefix={<BookOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Blog Views"
                  value={studentAnalytics.blog_views || 0}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Comments"
                  value={studentAnalytics.total_comments || 0}
                  prefix={<CommentOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Card title="Session Performance" className="mt-6">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Completed Sessions"
                  value={studentAnalytics.completed_sessions || 0}
                  suffix={`/ ${studentAnalytics.total_sessions || 0}`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Cancelled Sessions"
                  value={studentAnalytics.cancelled_sessions || 0}
                  suffix={`/ ${studentAnalytics.total_sessions || 0}`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Average Duration"
                  value={studentAnalytics.average_session_duration || 0}
                  suffix="min"
                />
              </Col>
            </Row>
          </Card>

          {dailyData.length > 0 && (
            <Card title="Sessions Over Time (Last 15 Days)" className="mt-6">
              <Column
                data={dailyData}
                xField="date"
                yField="sessions"
                color="#1890ff"
                label={{
                  position: "top",
                  style: {
                    fill: "#000000",
                    opacity: 0.8,
                  },
                }}
                xAxis={{
                  label: {
                    style: {
                      fontSize: 12,
                    },
                  },
                }}
                tooltip={{
                  showTitle: false,
                  formatter: (datum) => ({
                    name: "Sessions",
                    value: datum.sessions,
                  }),
                }}
              />
            </Card>
          )}

          <Card title="Subject Performance" className="mt-6">
            <Table
              dataSource={
                studentAnalytics.subjects?.map((subject, index) => ({
                  ...subject,
                  key: `${subject.name}-${index}`,
                })) || []
              }
              columns={[
                {
                  title: "Subject",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Sessions",
                  dataIndex: "sessions_count",
                  key: "sessions_count",
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.sessions_count - b.sessions_count,
                },
                {
                  title: "Progress",
                  dataIndex: "progress",
                  key: "progress",
                  render: (progress) => `${progress || 0}%`,
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.progress - b.progress,
                },
              ]}
              pagination={false}
            />
          </Card>
        </>
      ) : (
        <Alert
          message="Select a student to view their analytics"
          type="info"
          showIcon
        />
      )}
    </div>
  );
};

export default AnalyticDashBoard;
