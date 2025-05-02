import { Alert, Button, Table } from "antd";
import { AdminHeader } from "../AdminHeader";
import { TableActionBtn } from "../common/TableActionBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../redux/features/accounts/accounts.slice";
import {
  getAllUsers,
  deleteUser,
} from "../../../redux/features/accounts/accounts.service";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

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
        to={`/admin/accounts/users/edit/${record._id}`}
        afterAction={getAllUsers}
      />
    ),
  },
];

export const AccountsUser = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { items, isLoading, isError } = useSelector(selectAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
          text: "Please wait while we delete the user.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(deleteUser(id));
          dispatch(getAllUsers());
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
        page_title="User Accounts"
        base_title="Users"
        base_href="/admin/accounts/users"
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
            rowSelection={rowSelection}
            dataSource={items}
            loading={isLoading}
          />
        </>
      )}
    </>
  );
};
