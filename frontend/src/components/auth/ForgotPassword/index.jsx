import { Button, Form, Input } from "antd";
import { AuthHeader } from "../AuthHeader";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../../axios";
import { useState } from "react";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const response = await httpPost("/users/forgotPassword", values);
      navigate("/otp-verify", { state: { email: values.email } });
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center min-h-screen items-center">
        <AuthHeader title={"Forgot Password"} />
        <Form
          onFinish={handleFinish}
          disabled={loading}
          className="w-[450px]"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Get OTP
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};
