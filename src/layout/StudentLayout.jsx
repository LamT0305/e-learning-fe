import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import useAuth from "../redux/hooks/useAuth";

const { Header, Sider, Content } = Layout;

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/student-messages",
      icon: <MessageOutlined />,
      label: <Link to="/student-messages">Messages</Link>,
    },
    {
      key: "/view-tutor",
      icon: <UserOutlined />,
      label: <Link to="/view-tutor">View Tutor</Link>,
    },
    {
      key: "/notifications",
      icon: <BellOutlined />,
      label: <Link to="/notifications">Notifications</Link>,
    },
    {
      key: "schedule",
      icon: <ScheduleOutlined />,
      label: "Schedule",
      children: [
        {
          key: "/view-student-schedules",
          label: <Link to="/view-student-schedules">View Schedules</Link>,
        },
      ],
    },
    {
      key: "blog",
      icon: <FileTextOutlined />,
      label: "Blog",
      children: [
        {
          key: "/create-blog",
          label: <Link to="/create-blog">Create Blog</Link>,
        },
        {
          key: "/blog-management",
          label: <Link to="/blog-management">Blog Management</Link>,
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: <Link to="/student/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="w-full"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginRight: "24px" }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar src={user?.avatar} style={{ marginRight: "8px" }} />
                <span>{user?.name}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;
