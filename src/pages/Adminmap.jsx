import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Adminmap = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch complaints when the component loads
  useEffect(() => {
    let isMounted = true;

    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          throw new Error("Admin authentication token not found.");
        }

        const response = await axios.get(
          "http://localhost:5000/api/admin/complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setComplaints(response.data.complaints || []);
        }
      } catch (err) {
        console.error("Map complaints error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load complaints."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchComplaints();
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Filter complaints with valid coordinates
  const validComplaints = complaints.filter((complaint) => {
    const latitude = Number(complaint.latitude);
    const longitude = Number(complaint.longitude);

    return (
      complaint.latitude != null &&
      complaint.longitude != null &&
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">
        Complaint Locations Map
      </h1>

      <p className="text-gray-600 mb-5">
        View reported civic issues across different locations.
      </p>

      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow">
          Loading complaint locations...
        </div>
      ) : error ? (
        <div className="bg-white p-6 rounded-lg shadow text-red-600">
          {error}
        </div>
      ) : validComplaints.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          No complaints with valid location coordinates found.
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700 mb-3">
            Total mapped complaints: {validComplaints.length}
          </p>

          <MapContainer
            center={[
              Number(validComplaints[0].latitude),
              Number(validComplaints[0].longitude),
            ]}
            zoom={12}
            scrollWheelZoom={true}
            style={{
              height: "550px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {validComplaints.map((complaint, index) => (
              <Marker
                key={complaint.id || index}
                position={[
                  Number(complaint.latitude),
                  Number(complaint.longitude),
                ]}
              >
                <Popup>
                  <div>
                    <strong>
                      {complaint.title || "Civic Complaint"}
                    </strong>
                    <br />
                    Category: {complaint.category || "N/A"}
                    <br />
                    Status: {complaint.status || "Pending"}
                    <br />
                    Address: {complaint.address || "N/A"}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Adminmap;