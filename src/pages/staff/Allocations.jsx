import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, message, Select, Tag } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useStaff from "../../redux/hooks/useStaff";
import dayjs from "dayjs";

function Allocations() {
  const {
    allocations,
    tutors,
    students,
    fetchAllocations,
    fetchTutors,
    fetchStudents,
    createAllocation,
    deleteAllocation,
    isLoading,
  } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tutorId, setTutorId] = useState("");
  const [studentIds, setStudentIds] = useState([]);

  useEffect(() => {
    fetchAllocations();
    fetchTutors();
    fetchStudents();
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

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this allocation?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await deleteAllocation(id);
        fetchAllocations();
      },
    });
  };

  const handleSubmit = async () => {
    createAllocation({
      tutorId: tutorId,
      studentIds: studentIds,
    });

    setIsModalOpen(false);
    form.resetFields();
    fetchAllocations();
  };

  const handleSelectStudent = (value) => {
    if (studentIds.some((st) => st === value)) {
      setStudentIds(studentIds.filter((st) => st !== value));
    } else {
      setStudentIds([...studentIds, value]);
    }
  };

  // console.log(allocations)
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Manage Allocations</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Create Allocation
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={allocations?.map((allocation) => ({
          ...allocation,
          key: allocation._id,
        }))}
        rowKey="_id"
        loading={isLoading}
        className="h-[70vh] overflow-y-scroll"
      />

      <Modal
        title="Create Allocation"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="tutorId"
            label="Select Tutor"
            rules={[{ required: true, message: "Please select a tutor!" }]}
          >
            <Select
              placeholder="Select a tutor"
              options={tutors.map((tutor) => ({
                value: tutor._id,
                label: tutor.name,
              }))}
              onSelect={(value) => setTutorId(value)}
            />
          </Form.Item>
          <Form.Item
            name="studentIds"
            label="Select Students"
            rules={[
              { required: true, message: "Please select students!" },
              {
                validator: (_, value) => {
                  if (value && value.length > 10) {
                    return Promise.reject(
                      "Maximum 10 students can be selected"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select students (max 10)"
              options={students.map((student) => ({
                value: student._id,
                label: student.name,
              }))}
              maxTagCount={5}
              onSelect={(value) => handleSelectStudent(value)}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Allocations;
