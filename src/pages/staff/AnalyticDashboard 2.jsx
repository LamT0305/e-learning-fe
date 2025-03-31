import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Spin,
  Alert,
  Select,
  Switch,
  Table,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import useAnalytic from "../../redux/hooks/useAnalytic";
import useStaff from "../../redux/hooks/useStaff";

function AnalyticDashboard() {
  const {
    isLoading,
    overallAnalytics,
    studentAnalytics,
    error,
    handleGetOverallAnalytics,
    handleGetStudentAnalytics,
  } = useAnalytic();
  const { students, fetchStudents } = useStaff();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOverall, setViewOverall] = useState(true);

  useEffect(() => {
    fetchStudents();
    handleGetOverallAnalytics();
  }, []);

  useEffect(() => {
    if (selectedStudent && !viewOverall) {
      handleGetStudentAnalytics(selectedStudent);
    }
  }, [selectedStudent, viewOverall]);

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

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div className="p-6 h-[85vh] overflow-y-auto flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      <Switch
        checked={viewOverall}
        onChange={(checked) => setViewOverall(checked)}
        checkedChildren="Overall"
        unCheckedChildren="Student"
        style={{ marginBottom: 20, width:'fit-content' }}
      />

      {!viewOverall && (
        <Select
          placeholder="Select a student"
          style={{ width: 200, marginBottom: 20 }}
          onChange={(value) => setSelectedStudent(value)}
          options={students.map((student) => ({
            value: student._id,
            label: student.name,
          }))}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : viewOverall ? (
        overallAnalytics ? (
          <>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Sessions"
                    value={overallAnalytics.totalSessions}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Blogs"
                    value={overallAnalytics.totalBlogs}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Blog Views"
                    value={overallAnalytics.blogViews}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Comments"
                    value={overallAnalytics.totalComments}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="Session Performance" className="mt-6">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Completed Sessions"
                    value={overallAnalytics.completedSessions}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Cancelled Sessions"
                    value={overallAnalytics.cancelledSessions}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Average Duration"
                    value={Math.round(overallAnalytics.averageSessionDuration)}
                    suffix="min"
                  />
                </Col>
              </Row>
            </Card>
          </>
        ) : (
          <Alert
            message="No overall analytics data available"
            type="info"
            showIcon
          />
        )
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
                  position: "middle",
                  style: {
                    fill: "#FFFFFF",
                    opacity: 0.6,
                  },
                }}
                xAxis={{
                  label: {
                    style: {
                      fontSize: 12,
                    },
                  },
                }}
                tooltip={false}
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
}

export default AnalyticDashboard;
