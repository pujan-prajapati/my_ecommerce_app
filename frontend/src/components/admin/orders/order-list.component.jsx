import { Button, Table, Tag } from "antd";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect, useState } from "react";
import {
  deleteOrder,
  getAllOrders,
} from "../../../redux/features/orders/order.service";
import { TableActionBtn } from "../common/TableActionBtn";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

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
    title: "ACTIONS",
    dataIndex: "actions",
    align: "right",
    width: 200,
    render: (text, record) => (
      <div className="flex gap-3">
        <TableActionBtn
          to={`/admin/orders/edit/${record._id}`}
          id={record._id}
          action={deleteOrder}
          afterAction={getAllOrders}
        />
      </div>
    ),
  },
];

export const OrderList = () => {
  const { orders, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the orders.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteOrder(id));
          dispatch(getAllOrders());
        }
        setSelectedRowKeys([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected orders have been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <AdminHeader
        base_href={"/admin/orders"}
        base_title={"Orders"}
        page_title={"Order List"}
      />

      <div className="mb-4 flex justify-end">
        <Button
          danger
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={handleDeleteSelected}
        >
          <FaTrash /> Delete Selected
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        rowKey={"_id"}
        scroll={{ x: "max-content" }}
        rowSelection={rowSelection}
      />
    </>
  );
};
