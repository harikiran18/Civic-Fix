
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaintById } from "../services/complaintService";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchComplaint = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getComplaintById(id);

        if (active) {
          setComplaint(response.complaint || null);
        }
      } catch (err) {
        console.error("Fetch complaint error:", err);

        if (active) {
          setError(
            err.response?.data?.message ||
              "Failed to load complaint. Please try again."
          );
          setComplaint(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchComplaint();

    return () => {
      active = false;
    };
  }, [id]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const formattedDate = complaint?.created_at
    ? new Date(complaint.created_at).toLocaleString()
    : "Not available";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-xl text-slate-600">Loading complaint details...</p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Complaint Details
        </h2>

        <p className="text-red-600 mb-6">
          {error || "Complaint not found."}
        </p>

        <button
          onClick={() => navigate("/my-complaints")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Back to My Complaints
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/my-complaints")}
          className="mb-5 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to My Complaints
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
              Complaint Details
            </h1>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusStyle(
                complaint.status
              )}`}
            >
              {complaint.status || "Unknown"}
            </span>
          </div>

          {complaint.image_url && (
            <img
              src={complaint.image_url}
              alt={complaint.title || "Complaint image"}
              className="w-full max-h-96 object-cover rounded-xl mb-6"
            />
          )}

          <div className="space-y-5 text-slate-700">
            <div>
              <p className="text-sm text-slate-500 font-medium">Complaint ID</p>
              <p className="font-semibold">#{complaint.id || id}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">Title</p>
              <p className="font-semibold text-lg">{complaint.title}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">Category</p>
              <p>{complaint.category}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">Description</p>
              <p className="whitespace-pre-wrap">{complaint.description}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">Address</p>
              <p>{complaint.address || "Not provided"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-slate-500 font-medium">Latitude</p>
                <p>{complaint.latitude ?? "Not available"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 font-medium">Longitude</p>
                <p>{complaint.longitude ?? "Not available"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500 font-medium">Created At</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
