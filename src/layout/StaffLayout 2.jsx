import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import useAuth from "../redux/hooks/useAuth";

const { Header, Sider, Content } = Layout;

const StaffLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/staff/dashboard",
      icon: <UserOutlined />,
      label: <Link to="/staff/dashboard">Dashboard</Link>,
    },
    {
      key: "/staff/tutors",
      icon: <TeamOutlined />,
      label: <Link to="/staff/tutors">Manage Tutors</Link>,
    },
    {
      key: "/staff/students",
      icon: <TeamOutlined />,
      label: <Link to="/staff/students">Manage Students</Link>,
    },
    {
      key: "/staff/allocations",
      icon: <ScheduleOutlined />,
      label: <Link to="/staff/allocations">Allocations</Link>,
    },
    {
      key: "/staff/analytics",
      icon: <BarChartOutlined />,
      label: <Link to="/staff/analytics">Analytics</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: <Link to="/staff/profile">Profile</Link>,
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

export default StaffLayout;
