
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../services/complaintService";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getMyComplaints();
        setComplaints(response.complaints || []);
      } catch (error) {
        console.error("Failed to load complaints:", error);
        alert("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          My Complaints
        </h1>

        {complaints.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500">
              You haven't submitted any complaints yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {complaint.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {complaint.category}
                </p>

                <p className="mt-4">{complaint.description}</p>

                <p className="mt-4 text-sm text-gray-600">
                  <strong>Status:</strong> {complaint.status}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {complaint.address}
                </p>

                {complaint.image_url && (
                  <img
                    src={complaint.image_url}
                    alt={complaint.title}
                    className="mt-4 h-48 w-full object-cover rounded-lg"
                  />
                )}

                <Link
                  to={`/complaints/${complaint.id}`}
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
