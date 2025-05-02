/* eslint-disable react/prop-types */
import { Button, Form, Input, Select, Spin, Upload } from "antd";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { useEffect, useState } from "react";

export const CategoryForm = ({ onFinish, initialValues }) => {
  const { isLoading } = useSelector(selectCategory);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialValues?.image) {
      setFileList([
        {
          uid: "-1",
          name: initialValues.name,
          status: "done",
          url: initialValues.image,
        },
      ]);
    }
  }, [initialValues]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spin />
        <p className="ml-2">uploading Category...</p>
      </div>
    );

  return (
    <>
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        {/* title */}
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter category title" }]}
        >
          <Input placeholder="Enter category title" />
        </Form.Item>

        {/* description */}
        <Form.Item
          label="Category Description"
          name="description"
          rules={[
            { required: true, message: "Please enter category description" },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Enter category description" />
        </Form.Item>

        {/* status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select category status">
            <Select.Option value="Published">Published</Select.Option>
            <Select.Option value="Scheduled">Scheduled</Select.Option>
            <Select.Option value="Unpublished">Unpublished</Select.Option>
          </Select>
        </Form.Item>

        {/* category image */}
        <Form.Item
          label="Category Image"
          name="image"
          valuePropName="file"
          getValueFromEvent={(e) => e.file}
        >
          <Upload
            name="image"
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          >
            <Button size="large">
              <FaUpload />
            </Button>
          </Upload>
        </Form.Item>

        {/* submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Category" : "Create Category"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
