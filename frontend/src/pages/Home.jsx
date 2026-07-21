import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Home = () => {

  const { user } = useAuth();

  return (
    <>

      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center">

        <h1 className="text-4xl font-bold">
          Welcome
        </h1>

        <h2 className="text-2xl mt-5">
          {user?.name}
        </h2>

        <p className="mt-3">
          {user?.email}
        </p>

      </div>

    </>
  );
};

export default Home;