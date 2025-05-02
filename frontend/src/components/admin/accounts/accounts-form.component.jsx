/* eslint-disable react/prop-types */
import { Button, Form, Select } from "antd";

export const AccountsForm = ({ onFinish, form }) => {
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        labelAlign="left"
        onFinish={onFinish}
      >
        <Form.Item label="Role" name="role">
          <Select
            placeholder="Select Role"
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
