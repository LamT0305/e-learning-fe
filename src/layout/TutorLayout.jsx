import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  MessageOutlined,
  CalendarOutlined,
  BookOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import useAuth from "../redux/hooks/useAuth";

const { Header, Sider, Content } = Layout;

function TutorLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/tutor",
      icon: <HomeOutlined />,
      label: <Link to="/tutor">Home</Link>,
    },
    {
      key: "/tutor/schedule",
      icon: <CalendarOutlined />,
      label: <Link to="/tutor/schedule">Schedule</Link>,
    },
    {
      key: "/tutor/blogs",
      icon: <BookOutlined />,
      label: <Link to="/tutor/blogs">Blogs</Link>,
    },
    {
      key: "/tutor/messages",
      icon: <MessageOutlined />,
      label: <Link to="/tutor/messages">Messages</Link>,
    },
    {
      key: "/tutor/notifications",
      icon: <BellOutlined />,
      label: <Link to="/tutor/notifications">Notifications</Link>,
    },
    {
      key: "/tutor/analytics",
      icon: <UserOutlined />,
      label: <Link to="/tutor/analytic-dashboard">Analytics</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: <Link to="/tutor/profile">Profile</Link>,
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
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={["/tutor"]}
          items={menuItems}
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
                  gap: "8px",
                }}
              >
                <Avatar icon={<UserOutlined />} src={user?.avatar} />
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
}

export default TutorLayout;
