import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Password does not match");
    }

    try {
      setLoading(true);

      const res = await api.post(`/resetPassword/${token}`, {
        password,
      });

      alert(res.data.msg);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Reset Password Failed");
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

        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border w-full p-3 rounded mb-5"
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;