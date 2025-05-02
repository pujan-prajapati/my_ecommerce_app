/* eslint-disable react/prop-types */
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const AdminHeader = ({ page_title, base_title, base_href }) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold underline mb-4">{page_title}</h1>

      <Breadcrumb
        items={[
          { title: <Link to={base_href}>{base_title}</Link> },
          { title: page_title },
        ]}
      />
    </div>
  );
};
