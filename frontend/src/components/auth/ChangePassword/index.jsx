import { Button, Form, Input } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { notify } from "../../../helpers";
import { httpPost } from "../../../axios";

export const ChangePassword = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!state?.email) {
    return <Navigate to="/" />;
  }

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const data = {
        email: state.email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      const response = await httpPost("users/changePassword", data);
      notify(response.message);
      navigate("/login");
      return response.data;
    } catch (error) {
      if (error.response) {
        notify(error.response.data.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="space-y-4 flex flex-col justify-center min-h-screen items-center">
        <h2 className="text-4xl font-semibold">Change Password</h2>
        <h3 className="text-lg">Change password for {state.email}</h3>
        <Form
          onFinish={handleFinish}
          disabled={loading}
          className="w-[450px]"
          layout="vertical"
        >
          <Form.Item
            className="mb-5"
            label="New Password"
            name="newPassword"
            rules={[
              {
                min: "6",
                message: "Password must be at least 6 characters long",
              },
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                min: "6",
                message: "Password must be at least 6 characters long",
              },
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};
