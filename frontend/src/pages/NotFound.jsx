import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <h2 className="text-2xl mt-3">
        Page Not Found
      </h2>

      <Link
        to="/"
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;