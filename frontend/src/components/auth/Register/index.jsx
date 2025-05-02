import { Button, Form, Input, Spin, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthHeader } from "../AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/features/auth/auth.service";
import { reset, selectAuth } from "../../../redux/features/auth/auth.slice";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

export const RegisterComponent = () => {
  const { isError, isSuccess, isLoading, errorMsg, registerSuccess } =
    useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const handleAvatarChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleFormFinish = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    dispatch(registerUser(formData));
  };

  const handleFormFailed = () => {
    toast.error("Fill all fields");
  };

  useEffect(() => {
    if (isSuccess && registerSuccess) {
      toast.success("Register Success");
      navigate("/login");
      form.resetFields();
      setFileList([]);
      dispatch(reset());
    } else if (isError) {
      toast.error(errorMsg || "Registeration Failed");
    }
  }, [isSuccess, isError, errorMsg, navigate, form, registerSuccess, dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
        <p className="ml-4">Registering</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <AuthHeader title="Register" />
        <Form
          form={form}
          onFinish={handleFormFinish}
          onFinishFailed={handleFormFailed}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 4 }}
          labelAlign="left"
          className="max-w-[600px] w-full"
        >
          {/* avatar */}
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "avatar is required",
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              fileList={fileList} // Pass the fileList state
              onChange={handleAvatarChange} // Update fileList state
              maxCount={1} // Allow only one file
            >
              <Button icon={<FaUpload />}>Select Avatar</Button>
            </Upload>
          </Form.Item>

          {/* username */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "First name is required",
              },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>

          {/* lastname */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "lastname is required",
              },
            ]}
          >
            <Input placeholder="lastname" />
          </Form.Item>

          {/* email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Must be valid email",
              },
            ]}
          >
            <Input placeholder="Email..." />
          </Form.Item>

          {/* address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "address is required",
              },
              {
                type: "address",
                message: "Must be valid address",
              },
            ]}
          >
            <Input placeholder="address..." />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Mobile is required",
              },
            ]}
          >
            <Input type="number" placeholder="mobile" />
          </Form.Item>

          {/* password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              {
                min: 6,
                message: "Must be atleast 6 characters",
              },
            ]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 4,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
