import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-gray-500 mt-3">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl"
      >
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;