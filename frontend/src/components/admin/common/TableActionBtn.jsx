/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const TableActionBtn = ({ id, action, to, afterAction }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
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
        await dispatch(action(id));
        dispatch(afterAction());
        Swal.fire({
          title: "Deleted!",
          text: "Deleted Successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="space-x-3">
      <Button danger type="primary" onClick={handleDelete}>
        <FaTrash />
      </Button>
      <Link to={to}>
        <Button type="primary">
          <FaPen />
        </Button>
      </Link>
    </div>
  );
};
