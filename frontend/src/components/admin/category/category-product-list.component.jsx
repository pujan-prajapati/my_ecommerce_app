import { useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { Alert, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import {
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
} from "../../../redux/features/products/product.service";
import { TableTag } from "../common/TableTag";
import { TableActionBtn } from "../common/TableActionBtn";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const columns = [
  {
    title: "PRODUCTS",
    dataIndex: "products",
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
              ? `${record.description.slice(0, 100)}...`
              : record.description}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "PRODUCT STATUS",
    dataIndex: "status",
    render: (text) => (
      <TableTag
        tagTitle={text}
        tagColor={text === "in_stock" ? "success" : "error"}
      />
    ),
  },
  {
    title: "PRODUCT CATEGORY",
    dataIndex: "category",
    render: (text, record) => <p>{record.category.name}</p>,
  },

  {
    title: "ACTIONS",
    dataIndex: "actions",
    align: "right",
    render: (text, record) => (
      <TableActionBtn
        action={deleteProduct}
        id={record._id}
        afterAction={getAllProducts}
        to={`/admin/products/edit/${record._id}`}
      />
    ),
  },
];

export const CategoryProductList = () => {
  const { id } = useParams();
  const { products, isError, isLoading } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

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
          await dispatch(deleteProduct(id));
          dispatch(getAllProducts());
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

  useEffect(() => {
    dispatch(getProductsByCategory(id));
  }, [dispatch, id]);

  return (
    <>
      <AdminHeader
        base_href={"/admin/category"}
        base_title={"Categories"}
        page_title={`Category: ${products[0]?.category?.name}`}
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
            dataSource={products}
            loading={isLoading}
            rowKey="_id"
          />
        </>
      )}
    </>
  );
};
