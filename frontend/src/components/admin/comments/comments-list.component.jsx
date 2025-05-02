import { Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import {
  deleteComment,
  getAllComments,
} from "../../../redux/features/comments/comments.service";
import { selectComments } from "../../../redux/features/comments/comment.slice";
import { Link } from "react-router-dom";

const columns = (handleDelete) => [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    width: "500px",
    render: (text, record) => (
      <div className="flex gap-4">
        <img
          src={record?.product?.image}
          alt={record?.product?.name}
          className="w-16 h-16 object-contain "
        />
        <p>
          {record?.product?.name?.length > 50
            ? `${record?.product?.name.slice(0, 50)}...`
            : record?.product?.name}
        </p>
      </div>
    ),
  },
  {
    title: "Customer",
    dataIndex: "name",
    key: "name",
    width: "200px",
    render: (text, record) => (
      <p>{record?.user?.firstName + " " + record?.user?.lastName}</p>
    ),
  },

  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    render: (text) => (
      <p>{text.length > 50 ? `${text.slice(0, 50)}...` : text}</p>
    ),
  },
  {
    title: "Comment Date",
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
      <div className="flex gap-3 justify-end">
        <Button type="primary" danger onClick={() => handleDelete(record._id)}>
          <FaTrash />
        </Button>
        <Link to={`/admin/comments/${record._id}`}>
          <Button type="primary" className="bg-green-600 hover:!bg-green-500">
            Reply
          </Button>
        </Link>
      </div>
    ),
  },
];

export const CommentsList = () => {
  const { comments, isLoading } = useSelector(selectComments);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllComments());
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
          text: "Please wait while we delete the comment.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteComment(id));
          dispatch(getAllComments());
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await dispatch(deleteComment(id));
        dispatch(getAllComments());
        Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <AdminHeader
        base_href={"/admin/comments"}
        base_title={"Comments"}
        page_title={"Comments List"}
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
        columns={columns(handleDelete)}
        dataSource={comments}
        loading={isLoading}
        rowKey={"_id"}
        scroll={{ x: "max-content" }}
        rowSelection={rowSelection}
      />
    </>
  );
};
