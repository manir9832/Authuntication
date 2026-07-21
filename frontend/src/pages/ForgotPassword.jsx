import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/forgotpassword", {
        email,
      });

      alert(res.data.msg);
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
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
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-3 rounded mb-5"
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-center mt-5">
          <Link to="/login" className="text-blue-600">
            Back To Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default ForgotPassword;