
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }
      );

      const { token, admin } = response.data;

      if (!token || !admin) {
        throw new Error("Invalid server response.");
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("admin", JSON.stringify(admin));

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Admin login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Sign in to manage CivicFix complaints.
        </p>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-md bg-red-100 text-red-700 p-3 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block mb-2 font-medium"
            >
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin email"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block mb-2 font-medium"
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
