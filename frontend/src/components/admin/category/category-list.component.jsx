import { Alert, Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../../redux/features/category/category.service";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { TableTag } from "../common/TableTag";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "CATEGORY",
    dataIndex: "category",
    render: (text, record) => (
      <div className="flex gap-3">
        <img
          src={record.image}
          className="w-14 h-14 object-contain rounded-md"
          alt={record.name}
        />
        <div>
          <strong>{record.name}</strong>
          <p>
            {record.description.length > 100
              ? record.description.slice(0, 100) + "..."
              : record.description}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "CATEGORY STATUS",
    dataIndex: "status",
    render: (text) => (
      <TableTag
        tagTitle={text}
        tagColor={
          text === "Published"
            ? "success"
            : text === "Scheduled"
            ? "processing"
            : "error"
        }
      />
    ),
  },
  {
    title: "PRODUCTS",
    dataIndex: "products",
    render: (text, record) => (
      <Link
        to={`/admin/category/products/${record._id}`}
        className="text-blue-500"
      >
        View products
      </Link>
    ),
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn
        action={deleteCategory}
        id={record._id}
        afterAction={getAllCategories}
        to={`/admin/category/edit/${record._id}`}
      />
    ),
  },
];

export const CategoryList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector(selectCategory);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllCategories());
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
          text: "Please wait while we delete the admin.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteCategory(id));
          dispatch(getAllCategories());
        }
        setSelectedRowKeys([]);
        Swal.fire({
          title: "Deleted!",
          text: "Selected users have been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <AdminHeader
        page_title={"Category List"}
        base_title={"Category"}
        base_href={"/admin/category"}
      />

      {isError ? (
        <Alert type="error" message={isError} />
      ) : (
        <>
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
            rowSelection={rowSelection}
            dataSource={categories}
            loading={isLoading}
            rowKey="_id"
          />
        </>
      )}
    </>
  );
};
