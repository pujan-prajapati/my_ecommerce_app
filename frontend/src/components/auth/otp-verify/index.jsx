/* eslint-disable react/prop-types */
import { Button, Input } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { httpPost } from "../../../axios";
import { notify } from "../../../helpers";
import { Navigate } from "react-router-dom";

export const OTPVerify = () => {
  const { state } = useLocation();
  let [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!state?.email) {
    return <Navigate to="/" />;
  }

  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await httpPost("users/verifyOTP", {
        email: state.email,
        otp: otp,
      });
      notify(response.message);
      navigate("/change-password", { state: { email: state.email } });
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
      <section className="flex flex-col justify-center min-h-screen items-center">
        <div className="space-y-5 bg-gray-100 rounded-lg shadow-lg w-[450px] h-[300px] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-semibold">Verify</h2>
          <p>
            Your code was sent to you via email : <strong>{state.email}</strong>
          </p>
          <Input
            className="w-52"
            disabled={loading}
            maxLength={5}
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button type="primary" onClick={handleVerify} loading={loading}>
            Verify
          </Button>

          <Link
            to={"/forgot-password"}
            className="text-blue-500 hover:underline"
          >
            Resend OTP
          </Link>
        </div>
      </section>
    </>
  );
};
