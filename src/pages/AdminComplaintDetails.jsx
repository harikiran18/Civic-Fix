
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchComplaintDetails = useCallback(async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.complaint;

      setComplaint(data);
      setStatus(data.status);
    } catch (err) {
      console.error("Fetch complaint error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
        "Failed to load complaint details."
      );
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchComplaintDetails();
  }, [fetchComplaintDetails]);

  const handleUpdateStatus = async () => {
    if (!status || !complaint || status === complaint.status || updating) {
      return;
    }

    const allowedStatuses = ["Pending", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      setError("Please select a valid complaint status.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const response = await axios.put(
        `${API_URL}/complaints/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedComplaint = response.data.complaint;

      setComplaint(updatedComplaint);
      setStatus(updatedComplaint.status);
    } catch (err) {
      console.error("Status update error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
        "Failed to update complaint status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const statusStyle = (value) => {
    if (value === "Resolved") {
      return "bg-green-100 text-green-700";
    }

    if (value === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-blue-600">
          Loading complaint details...
        </p>
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <p className="text-red-600 text-lg mb-5">{error}</p>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-5 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-7">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Complaint Details
            </h1>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyle(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 p-3 rounded-lg bg-red-100 text-red-700"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-gray-500">Complaint ID</p>
              <p className="font-semibold">#{complaint.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{complaint.category}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-semibold text-lg">{complaint.title}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {complaint.description || "No description provided."}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-700">
                {complaint.address || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Latitude</p>
              <p>{complaint.latitude ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Longitude</p>
              <p>{complaint.longitude ?? "N/A"}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Created Date</p>
              <p>
                {complaint.created_at
                  ? new Date(complaint.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>

          </div>

          {complaint.image_url && (
            <div className="mt-7">
              <h2 className="font-bold text-lg mb-3">
                Complaint Image
              </h2>

              <img
                src={complaint.image_url}
                alt="Submitted complaint"
                className="w-full max-w-lg rounded-lg border object-cover"
              />
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-bold mb-4">
              Update Complaint Status
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={updating}
                className="w-full sm:w-64 border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <button
                onClick={handleUpdateStatus}
                disabled={
                  updating ||
                  status === complaint.status ||
                  !status
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Save Status"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetails;
