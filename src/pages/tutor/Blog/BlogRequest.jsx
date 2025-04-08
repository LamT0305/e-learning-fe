import React, { useEffect } from "react";
import { Table, Button, Tag, Space, Typography, Modal } from "antd";
import { EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import useBlog from "../../../redux/hooks/useBlog";

const { Title } = Typography;

function BlogRequest() {
  const { isLoading, blogs, handleGetBlogRequest, handleApproveBlog } =
    useBlog();

  useEffect(() => {
    handleGetBlogRequest();
  }, []);

  const showBlogContent = (content) => {
    Modal.info({
      title: "Blog Content",
      width: 720,
      content: <div dangerouslySetInnerHTML={{ __html: content }}></div>,
    });
  };


  const columns = [
    {
      title: "Author",
      dataIndex: ["author_id", "name"],
      key: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="warning">Waiting for approval</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, blog) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showBlogContent(blog.content)}
          />
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleApproveBlog(blog._id, "0")}
            style={{ backgroundColor: "#52c41a" }}
          />
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={() => handleApproveBlog(blog._id, "1")}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Blog Requests
      </Title>

      <Table
        columns={columns}
        dataSource={blogs}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
}

export default BlogRequest;
