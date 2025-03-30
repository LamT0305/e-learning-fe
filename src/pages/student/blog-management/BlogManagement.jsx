import React, { useEffect } from "react";
import useBlog from "../../../redux/hooks/useBlog";
import "./style.css";
import { Link } from "react-router-dom";
import { Table, Space, Popconfirm, Tag, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function BlogManagement() {
  const [filter, setFilter] = React.useState("");
  const { isLoading, blogs, setMyBlogs, handleDeleteBlog } = useBlog();

  useEffect(() => {
    setMyBlogs(filter);
  }, [filter]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "30%",
      render: (text) => (
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: text.length > 100 ? text.substring(0, 100) + "..." : text,
          }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status_upload",
      key: "status",
      width: "15%",
      render: (status) => {
        const statusMap = {
          "-1": { color: "gold", text: "Pending Approval" },
          0: { color: "green", text: "Approved" },
          1: { color: "red", text: "Rejected" },
        };
        const { color, text } = statusMap[status] || {
          color: "default",
          text: "Unknown",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      width: "10%",
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/update-blog/${record._id}`}>
            <EditOutlined style={{ color: "#1890ff" }} />
          </Link>
          <Popconfirm
            title="Delete blog"
            description="Are you sure you want to delete this blog?"
            onConfirm={() => handleDeleteBlog(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="header-section" style={{ marginBottom: 20 }}>
        <h2 className="text-lg font-semibold">Blog Management</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1"
        >
          <option value="">All Blogs</option>
          <option value="-1">Pending Approval</option>
          <option value="0">Approved</option>
          <option value="1">Rejected</option>
        </select>
      </div>

      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} blogs`,
        }}
        className="w-full"
      />
    </div>
  );
}

export default BlogManagement;
