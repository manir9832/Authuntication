import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/login", formData);

      alert(res.data.msg);

      setUser(res.data.user);

      // অথবা শুধু এটাও করতে পারো
      await checkAuth();

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.msg || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-3 rounded mb-4"
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-5 flex justify-between text-sm">

          <Link
            to="/forgot-password"
            className="text-blue-600"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>

        </div>
      </form>
    </div>
  );
};

export default Login;