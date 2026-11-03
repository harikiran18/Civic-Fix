import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-16 flex-col justify-between">

        <div>

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl">
              🏙️
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                CivicFix
              </h1>

              <p className="text-blue-100">
                Smart Civic Complaint Platform
              </p>
            </div>

          </div>

          <div className="mt-20">

            <h2 className="text-5xl font-bold leading-tight">
              Build Better
              <br />
              Cities Together.
            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">
              Join thousands of citizens improving their communities by
              reporting civic issues with photos, live location, and
              real-time complaint tracking.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3 text-lg">
            <span>✅</span>
            <span>Easy Complaint Reporting</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>📍</span>
            <span>Live Location Support</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>📸</span>
            <span>Photo Upload</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span>📊</span>
            <span>Track Complaint Status</span>
          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

          <div className="text-center mb-8">

            <div className="text-5xl mb-4">
              🏙️
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3">
              Create your CivicFix account
            </p>

          </div>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Password */}

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-blue-600 transition"
              >
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>

            </div>

            <label className="flex items-center gap-3 text-sm text-gray-600">

              <input
                type="checkbox"
                className="w-4 h-4"
              />

              <span>
                I agree to the Terms & Conditions
              </span>

            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center my-8">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>

          <button className="w-full border border-gray-300 rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-gray-100 transition">

            <FaGoogle />

            Continue with Google

          </button>

          <p className="text-center text-gray-600 mt-8">

            Already have an account?

            <span className="ml-2 text-blue-600 font-semibold cursor-pointer hover:underline">
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;