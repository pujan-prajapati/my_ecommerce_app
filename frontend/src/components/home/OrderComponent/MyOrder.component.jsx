import { useEffect } from "react";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../../redux/features/orders/order.service";
import { Alert, Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SN",
    dataIndex: "_id",
    key: "_id",
    render: (text, render, index) => <p>{index + 1}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => <p>{record.firstName + " " + record.lastName}</p>,
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    render: (text, record) => <p>{record.paymentMethod.toUpperCase()}</p>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <Tag
        color={
          record.status === "pending"
            ? "yellow"
            : record.status === "processing"
            ? "orange"
            : record.status === "shipped"
            ? "blue"
            : record.status === "delivered"
            ? "green"
            : "red"
        }
        key={record.status}
      >
        {record.status}
      </Tag>
    ),
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (text, record) => <p>$ {record.totalPrice}</p>,
  },
  {
    title: "Total Items",
    dataIndex: "totalItems",
    key: "totalItems",
    render: (text, record) => <p>{record.product.length} items</p>,
  },
  {
    title: "Ordered Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text, record) => {
      const date = new Date(record.createdAt);
      return <p>{date.toLocaleDateString()}</p>;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "end",
    width: "200px",
    key: "action",
    render: (text, record) => (
      <Link to={`/orders/${record._id}`}>
        <Button type="primary" className="bg-orange-500 hover:!bg-orange-600">
          View Order Details
        </Button>
      </Link>
    ),
  },
];

export const MyOrder = () => {
  const { orders, isError, isLoading, currentPage, totalCount, errorMsg } =
    useSelector(selectOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  if (isError) return <Alert message={errorMsg} type="error" showIcon />;

  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={orders}
        rowKey={"_id"}
        loading={isLoading}
        pagination={{
          className: "text-white",
          pageSize: 10,
          current: currentPage,
          total: totalCount, // Use totalCount here for correct pagination
          onChange: (page) => {
            dispatch(getUserOrders({ page, limit: 10 }));
          },
          showSizeChanger: false, // Optionally hide the size changer
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`, // Optional: Show the range of items
        }}
      />
    </>
  );
};
