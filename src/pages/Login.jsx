import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser(formData);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl">
              🏙️
            </div>

            <div>
              <h1 className="text-4xl font-bold">CivicFix</h1>

              <p className="text-blue-100">
                Smart Civic Complaint Platform
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-5xl font-bold leading-tight">
              Welcome
              <br />
              Back!
            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">
              Login to your CivicFix account to report issues,
              monitor complaint progress, upload photos,
              and make your city a better place.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3 text-lg">
            <span>⚡</span>
            <span>Fast Complaint Reporting</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>📍</span>
            <span>Track Complaint Progress</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>📸</span>
            <span>Upload Issue Photos</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>🔒</span>
            <span>Secure Login Experience</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🏙️</div>

            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-3">
              Login to continue to CivicFix
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-4 text-gray-400 text-sm">OR</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full border border-gray-300 rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-gray-100 transition">
            <FaGoogle />
            Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;