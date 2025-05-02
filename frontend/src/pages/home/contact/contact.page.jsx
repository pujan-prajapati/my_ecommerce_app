import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { getLocalStore, notify } from "../../../helpers";
import { httpPost } from "../../../axios";
import { useState } from "react";

export const Contact = () => {
  const token = getLocalStore("accessToken");

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleContactFinish = async (values) => {
    setLoading(true);
    try {
      const response = await httpPost("/contact", values, true);
      form.resetFields();
      notify("Message Sent Successfully");
      return response.data;
    } catch (error) {
      notify("Failed to send message" + error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="relative h-full">
            <img
              src="https://pagedone.io/asset/uploads/1696488602.png"
              alt="ContactUs tailwind section"
              className="w-full h-full lg:rounded-l-md  object-cover"
            />
            <h1 className="text-white dark:text-white text-4xl font-bold absolute top-11 left-11">
              Contact us
            </h1>
            <div className="absolute bottom-0 w-full lg:p-11 p-5">
              <div className="bg-white rounded-lg p-6 block">
                {/* phone call */}
                <Link to="tel:470-601-1911" className="flex items-center mb-6">
                  <CiPhone className="text-orange-600 w-6 h-6" />
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    470-601-1911
                  </h5>
                </Link>

                {/* email */}
                <Link
                  to="mailto:Ww0lX@example.com"
                  className="flex items-center mb-6"
                >
                  <CiMail className="text-orange-600 w-6 h-6" />
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    admin@gmail.com
                  </h5>
                </Link>

                {/* location */}
                <Link to="/" className="flex items-center">
                  <CiLocationOn className="text-orange-600 w-6 h-6" />
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    654 Sycamore Avenue, Meadowville, WA 76543
                  </h5>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-md ">
            <h2 className="text-orange-600 dark:text-orange-600 font-manrope text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>

            {/* form */}
            <Form
              className="contact-form"
              layout="vertical"
              form={form}
              onFinish={handleContactFinish}
            >
              {/* full name */}
              <Form.Item
                label="Full Name"
                name={"fullName"}
                rules={[{ required: true, message: "Full Name is required" }]}
              >
                <Input placeholder="your name" />
              </Form.Item>

              {/* email */}
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  { required: true, message: "Email is required" },
                ]}
              >
                <Input placeholder="your email" />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Phone Number"
                name={"phone"}
                rules={[
                  { required: true, message: "Phone number is required" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                ]}
              >
                <Input placeholder="your phone number" />
              </Form.Item>

              {/* message */}
              <Form.Item
                label="Message"
                name={"message"}
                rules={[{ required: true, message: "Message is required" }]}
              >
                <Input.TextArea
                  rows={4}
                  className="!resize-none"
                  placeholder="your message"
                />
              </Form.Item>

              {token ? (
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    block
                    loading={loading}
                    className="py-6 mt-4 bg-orange-500 hover:!bg-orange-600"
                  >
                    Submit
                  </Button>
                </Form.Item>
              ) : (
                <Link to="/login">
                  <Button
                    type="link"
                    block
                    className="py-6 mt-4 text-orange-500 hover:!text-orange-600"
                  >
                    Login to submit message
                  </Button>
                </Link>
              )}
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};
