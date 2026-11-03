
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Fetch complaints from backend
const getAdminComplaints = async () => {
  const token = localStorage.getItem("adminToken");

  const response = await axios.get(
    "http://localhost:5000/api/admin/complaints",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.complaints || [];
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admin logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  };

  // Fetch complaints
  const fetchComplaints = async () => {
    setLoading(true);

    try {
      const data = await getAdminComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Fetch complaints error:", error);
      alert("Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch complaints whenever dashboard is opened or revisited
  useEffect(() => {
    let isMounted = true;

    const loadComplaints = async () => {
      try {
        const data = await getAdminComplaints();

        if (isMounted) {
          setComplaints(data);
        }
      } catch (error) {
        console.error("Fetch complaints error:", error);

        if (isMounted) {
          alert("Failed to load complaints.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadComplaints();

    return () => {
      isMounted = false;
    };
  }, [location.key]);

  // Dashboard statistics
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // Search and filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch = `${c.id} ${c.title} ${c.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || c.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [complaints, search, filter]);

  // Statistics cards
  const stats = [
    {
      title: "Total Complaints",
      value: total,
      icon: "📋",
    },
    {
      title: "Pending",
      value: pending,
      icon: "⏳",
    },
    {
      title: "In Progress",
      value: progress,
      icon: "🔧",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: "✅",
    },
  ];

  // Complaint status styling
  const statusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-red-100 text-red-700";
    }

    if (status === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <h2 className="text-xl font-bold text-blue-600">
          Loading CivicFix...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-slate-900 text-white min-h-screen fixed md:sticky top-0 z-50`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-blue-400">
            🏙️ CivicFix
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Admin Control Panel
          </p>
        </div>

        <nav className="p-4 space-y-3">

          <button
            onClick={() => {
              navigate("/admin/dashboard");
              setSidebarOpen(false);
            }}
            className="w-full text-left bg-blue-600 p-3 rounded-lg font-semibold"
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => {
              document.getElementById("complaints")?.scrollIntoView({
                behavior: "smooth",
              });

              setSidebarOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
          >
            📋 Complaints
          </button>

          <div className="border-t border-slate-700 my-5"></div>

          <p className="text-xs uppercase text-slate-500 px-3">
            Overview
          </p>

          <div className="px-3 py-2 text-slate-300">
            🟠 Pending: {pending}
          </div>

          <div className="px-3 py-2 text-slate-300">
            🔵 In Progress: {progress}
          </div>

          <div className="px-3 py-2 text-slate-300">
            🟢 Resolved: {resolved}
          </div>

        </nav>

        <div className="absolute bottom-0 p-5 border-t border-slate-700 w-full">
          <p className="font-semibold">Administrator</p>

          <p className="text-xs text-slate-400 mb-4">
            CivicFix Management
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 md:p-8">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden bg-slate-900 text-white p-3 rounded-lg"
            >
              ☰
            </button>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Welcome back, Administrator!
              </p>
            </div>

          </div>

          <button
            onClick={fetchComplaints}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2 rounded-lg shadow font-semibold"
          >
            ↻ Refresh
          </button>

        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-slate-500 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-3">
                    {stat.value}
                  </h2>
                </div>

                <div className="text-3xl bg-slate-100 p-4 rounded-xl">
                  {stat.icon}
                </div>

              </div>
            </div>
          ))}

        </section>

        {/* Complaint Management */}
        <section
          id="complaints"
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
        >

          <div className="p-5 md:p-6 border-b flex flex-col lg:flex-row justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Complaint Management
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and manage all citizen complaints.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

            </div>
          </div>

          {/* Complaints Table */}
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Complaint Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-10 text-slate-500"
                    >
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="p-4 font-semibold">
                        #{c.id}
                      </td>

                      <td className="p-4 font-medium text-slate-700">
                        {c.title}
                      </td>

                      <td className="p-4 text-slate-600">
                        {c.category}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600">
                        {c.created_at
                          ? new Date(c.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            navigate(`/admin/complaints/${c.id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                          View Details →
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm mt-8">
          © 2026 CivicFix | Smart Civic Complaint Platform
        </footer>

      </main>
    </div>
  );
};

export default AdminDashboard;
