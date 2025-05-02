/* eslint-disable react/prop-types */
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CreateAdminBtn = (props) => {
  return (
    <>
      <Link to={props.to}>
        <Button type="primary" className="h-14 w-14 rounded-full">
          <FaPlus />
        </Button>
      </Link>
    </>
  );
};
