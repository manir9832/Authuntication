import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      return alert("Please enter 6 digit OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/verifyemail", {
        code,
      });

      alert(res.data.msg);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-5">
          Verify Email
        </h2>

        {email && (
          <p className="text-center text-gray-600 mb-5">
            OTP sent to
            <br />
            <b>{email}</b>
          </p>
        )}

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-3 rounded w-full text-center text-xl tracking-[10px]"
        />

        <button
          className="bg-blue-600 text-white p-3 rounded mt-5 w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

      </form>

    </div>
  );
};

export default VerifyEmail;