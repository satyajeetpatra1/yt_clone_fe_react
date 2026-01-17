import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

// Error page component to display error messages
function ErrorPage() {
    // Get error details from the route
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 text-center border dark:border-zinc-800">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <FaExclamationTriangle className="text-red-600 text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for doesn’t exist or an unexpected error occurred."}
        </p>

        {/* Status Code */}
        {error?.status && (
          <p className="text-xs text-gray-400 mb-4">
            Error code: {error.status}
          </p>
        )}

        {/* Action */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
        >
          <FaHome />
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
