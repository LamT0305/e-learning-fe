import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  Tag,
  Space,
  Typography,
  Modal,
  Button,
  message,
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useSchedule from "../../../redux/hooks/useSchedule";
import AddSchedule from "./AddSchedule";

const { Title } = Typography;
const { Option } = Select;

function ViewSchedules() {
  const {
    isLoading,
    schedules,
    filter,
    handleTutorGetSchedules,
    handleUpdateStatus,
    handleFilterChange,
  } = useSchedule();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    handleTutorGetSchedules(selectedStatus === "all" ? null : selectedStatus);
  }, [selectedStatus]);

  const getStatusTag = (status) => {
    const statusConfig = {
      upcoming: { color: "processing", text: "Upcoming" },
      completed: { color: "success", text: "Completed" },
      cancelled: { color: "error", text: "Cancelled" },
    };
    return (
      <Tag color={statusConfig[status]?.color}>
        {statusConfig[status]?.text}
      </Tag>
    );
  };

  const handleStatusUpdate = async (scheduleId, newStatus) => {
    try {
      await handleUpdateStatus(scheduleId, newStatus);
    } catch (error) {
      message.error("Failed to update schedule status");
    }
  };

  const showScheduleDetails = (schedule) => {
    setSelectedSchedule(schedule);
    setViewModalOpen(true);
  };

  const columns = [
    {
      title: "Student",
      dataIndex: ["student", "name"],
      key: "student",
      className: "text-gray-800 font-medium",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      className: "text-gray-800",
    },
    {
      title: "Date & Time",
      key: "datetime",
      className: "text-gray-800",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="text-gray-700">
            {new Date(record.startTime).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-600">
            {new Date(record.startTime).toLocaleTimeString()} -{" "}
            {new Date(record.endTime).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      className: "text-gray-800",
      render: (_, record) => (
        <span className="text-gray-700">{record.sessionDuration} minutes</span>
      ),
    },
    {
      title: "Meeting Type",
      dataIndex: "meetingType",
      key: "meetingType",
      render: (type) => (
        <Tag
          className={`capitalize ${
            type === "online"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: getStatusTag,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space className="space-x-2">
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => showScheduleDetails(record)}
          />
          {record.status === "upcoming" && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                className="bg-green-500 hover:bg-green-600 border-none"
                onClick={() => handleStatusUpdate(record._id, "completed")}
              >
                Complete
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                className="hover:bg-red-600 hover:text-white"
                onClick={() => {
                  Modal.confirm({
                    title: "Cancel Schedule",
                    content: "Are you sure you want to cancel this schedule?",
                    onOk: () => handleStatusUpdate(record._id, "cancelled"),
                  });
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Title level={2} className="!text-gray-800 !mb-0">
            Schedule Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Schedule
          </Button>
        </div>
        <Select
          value={filter}
          onChange={(e) => handleFilterChange(e)}
          className="w-48"
        >
          <Option value="all">All Schedules</Option>
          <Option value="upcoming">Upcoming</Option>
          <Option value="completed">Completed</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-sm h-[72vh] overflow-y-auto">
        <Table
          columns={columns}
          dataSource={schedules}
          rowKey="_id"
          loading={isLoading}
          className="overflow-hidden"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
            className: "px-6 py-4 ",
          }}
        />
      </div>

      <Modal
        title="Add New Schedule"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={720}
      >
        <AddSchedule
          onClose={() => {
            setIsModalOpen(false);
            handleTutorGetSchedules(
              selectedStatus === "all" ? null : selectedStatus
            );
          }}
        />
      </Modal>

      <Modal
        title="Schedule Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedSchedule && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-600">Student</p>
                <p>{selectedSchedule.student.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Subject</p>
                <p>{selectedSchedule.subject}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Date</p>
                <p>
                  {new Date(selectedSchedule.startTime).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Time</p>
                <p>
                  {new Date(selectedSchedule.startTime).toLocaleTimeString()} -{" "}
                  {new Date(selectedSchedule.endTime).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Meeting Type</p>
                <p className="capitalize">{selectedSchedule.meetingType}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Status</p>
                <p>{getStatusTag(selectedSchedule.status)}</p>
              </div>
              {selectedSchedule.meetingType === "online" ? (
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Meeting Link</p>
                  <a
                    href={selectedSchedule.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {selectedSchedule.meetingLink}
                  </a>
                </div>
              ) : (
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Location</p>
                  <p>{selectedSchedule.location}</p>
                </div>
              )}
              {selectedSchedule.notes && (
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Notes</p>
                  <p>{selectedSchedule.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ViewSchedules;
