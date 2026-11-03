import { useState } from "react";
import LocationMap from "../components/LocationMap";
import { createComplaint } from "../services/complaintService";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    address: "",
    latitude: null,
    longitude: null,
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      alert("Please select a location on the map.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("address", formData.address);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await createComplaint(data);

      alert("Complaint submitted successfully.");

      setFormData({
        title: "",
        category: "",
        description: "",
        address: "",
        latitude: null,
        longitude: null,
        image: null,
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to submit complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Report a Civic Issue
        </h1>

        <p className="text-gray-500 mb-8">
          Fill in the details below to report an issue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Issue Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Pothole on Main Road"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Category</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Garbage">Garbage</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Street Light">Street Light</option>
              <option value="Drainage">Drainage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter issue location"
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Select Location on Map
            </label>

            <LocationMap
              position={
                formData.latitude && formData.longitude
                  ? {
                      lat: formData.latitude,
                      lng: formData.longitude,
                    }
                  : null
              }
              onLocationSelect={handleLocationSelect}
            />
          </div>

          {formData.latitude && formData.longitude && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-sm text-green-700">
                <strong>Latitude:</strong> {formData.latitude.toFixed(6)}
              </p>

              <p className="text-sm text-green-700">
                <strong>Longitude:</strong> {formData.longitude.toFixed(6)}
              </p>
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            {formData.image && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;