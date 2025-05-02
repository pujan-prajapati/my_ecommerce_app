/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Select, Spin, Upload } from "antd";
import { FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { Link } from "react-router-dom";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { getAllCategories } from "../../../redux/features/category/category.service";

export const ProductForm = ({ onFinish, initialValues }) => {
  const { isLoading } = useSelector(selectProduct);
  const [fileList, setFileList] = useState([]);
  const { categories } = useSelector(selectCategory);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spin />
        <p className="ml-2">uploading Product...</p>
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
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        {/* description */}
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Enter product description" />
        </Form.Item>

        {/* status */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select category status">
            <Select.Option value="in_stock">In Stock</Select.Option>
            <Select.Option value="out_of_stock">Out of Stock</Select.Option>
          </Select>
        </Form.Item>

        {/* category */}
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category status">
            {categories.map((category) => (
              <Select.Option key={category._id} values={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* category button*/}
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Link to={"/admin/category/createcategory"}>
            <Button type="primary">Create new category</Button>
          </Link>
        </Form.Item>

        {/* price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please select price" }]}
        >
          <InputNumber type="number" className="w-40" />
        </Form.Item>

        {/* quantity */}
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please select quantity" }]}
        >
          <InputNumber type="number" className="w-40" />
        </Form.Item>

        {/* category image */}
        <Form.Item
          label="Product Image"
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
            {initialValues ? "Update Product" : "Create Product"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
