import { Alert, Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../redux/features/accounts/accounts.slice";
import { useEffect, useState } from "react";
import {
  getAllAdmins,
  deleteUser,
} from "../../../redux/features/accounts/accounts.service";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => <p>{record.firstName + " " + record.lastName}</p>,
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    render: (text, record) => (
      <img
        src={record.avatar}
        alt={record.name}
        className="w-14 h-14 rounded-full object-cover"
      />
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    align: "right",
    render: (_, record) => (
      <TableActionBtn
        id={record._id}
        action={deleteUser}
        afterAction={getAllAdmins}
        to={`/admin/accounts/edit/${record._id}`}
      />
    ),
  },
];

export const AccountsAdmin = () => {
  const { items, isLoading, isError } = useSelector(selectAccount);
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
          await dispatch(deleteUser(id));
          dispatch(getAllAdmins());
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
    dispatch(getAllAdmins());
  }, [dispatch]);

  if (isError) return <Alert type="error" message={isError} />;

  return (
    <>
      <AdminHeader
        page_title="Admin Accounts"
        base_title="Admin"
        base_href="/admin/accounts"
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
            rowKey="_id"
            dataSource={items}
            loading={isLoading}
            rowSelection={rowSelection}
          />
        </>
      )}
    </>
  );
};
