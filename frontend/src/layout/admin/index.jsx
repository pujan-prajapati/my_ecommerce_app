import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  FaHamburger,
  FaShoppingBag,
  FaClipboardCheck,
  FaBox,
  FaDelicious,
  FaComment,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    icon: <FaHamburger />,
    label: <NavLink to="/admin">Dashboard</NavLink>,
  },
  {
    key: "accounts",
    icon: <FaClipboardCheck />,
    label: "Accounts",
    children: [
      {
        key: "admins",
        label: <NavLink to="/admin/accounts">Admins</NavLink>,
      },
      {
        key: "users",
        label: <NavLink to="/admin/accounts/users">Users</NavLink>,
      },
    ],
  },
  {
    key: "products",
    icon: <FaShoppingBag />,
    label: "Products",
    children: [
      {
        key: "productlist",
        label: <NavLink to="/admin/products">Products List</NavLink>,
      },
      {
        key: "createproducts",
        label: (
          <NavLink to={"/admin/products/createproducts"}>
            Create Product
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "categoies",
    icon: <FaBox />,
    label: "Category",
    children: [
      {
        key: "categorylist",
        label: <NavLink to="/admin/category">Category List</NavLink>,
      },
      {
        key: "createcategory",
        label: (
          <NavLink to={"/admin/category/createcategory"}>
            Create Category
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "orders",
    icon: <FaDelicious />,
    label: <NavLink to="/admin/orders">Orders</NavLink>,
  },
  {
    key: "comments",
    icon: <FaComment />,
    label: <NavLink to="/admin/comments">Comments</NavLink>,
  },
];

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Layout>
        <Sider
          width={300}
          collapsed={collapsed}
          className="h-screen bg-gray-100"
        >
          <div className="p-3 flex items-center">
            {collapsed ? (
              <h1 className="font-bold text-3xl">LO.</h1>
            ) : (
              <h1 className="font-bold text-3xl">LOGO</h1>
            )}
          </div>
          <Menu
            mode="inline"
            className="bg-transparent admin-menu"
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header className="bg-gray-200 flex justify-between items-center">
            <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
              <FaHamburger />
            </Button>
            <div>
              <Link
                to={"/"}
                className="bg-blue-600 text-white px-5 py-3 rounded-md hover:text-white hover:bg-blue-500 transition-all duration-100"
              >
                Home
              </Link>
            </div>
          </Header>
          <Content className="px-10 py-5 bg-gray-200 m-5 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
