import { Link } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Dashboard() {
  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            CivicFix Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome 👋
        </h2>

        <p className="text-gray-600 mb-8">
          Manage your civic complaints from one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">
              Report a New Issue
            </h3>

            <p className="text-gray-500 mb-5">
              Submit a new civic complaint with location and photos.
            </p>

            <Link
              to="/report"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Report Issue
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">
              My Complaints
            </h3>

            <p className="text-gray-500 mb-5">
              Track complaints you've submitted.
            </p>

            <Link
              to="/my-complaints"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              View Complaints
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">
              Profile
            </h3>

            <p className="text-gray-500 mb-5">
              Manage your account details.
            </p>

            <button
              disabled
              className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;