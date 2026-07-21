import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.post("/logout");

      alert(res.data.msg);

      setUser(null);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Logout Failed");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between">

      <h2 className="text-2xl font-bold">
        SkyR Auth
      </h2>

      <div className="flex gap-5 items-center">

        <h3>
          {user?.name}
        </h3>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;