import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "../App.css";

export default function SAdminType() {
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]); // For filtered types
  const [filter, setFilter] = useState("All"); // Default filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all types from the backend
  const fetchTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/type", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch types");
      }

      setTypes(data.types);
      setFilteredTypes(data.types); // Initialize filtered types
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the current user to get the orgId
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/current", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch current user");
      }

      // Extract the first organization ID from the organizations array
      const orgId = data.organizations?.[0];
      if (!orgId) {
        throw new Error("No organization found for the current user");
      }

      return orgId;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw new Error("Failed to fetch current user");
    }
  };

  // Approve a type
  const handleApprove = async (typeId) => {
    try {
      setLoading(true);

      // Fetch the current user's orgId
      const orgId = await fetchCurrentUser();

      const response = await fetch(
        `http://localhost:5000/type/approve/${typeId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orgId }), // Pass orgId in the request body
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to approve type");
      }

      alert("Type approved successfully!");
      fetchTypes(); // Refresh the list of types
    } catch (error) {
      console.error("Error approving type:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a type
  const handleDelete = async (typeId) => {
    if (!window.confirm("Are you sure you want to delete this type?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/type/delete/${typeId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete type");
      }

      alert("Type deleted successfully!");
      fetchTypes(); // Refresh the list of types
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter types based on status
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredTypes(types); // Show all types
    } else {
      setFilteredTypes(types.filter((type) => type.status === selectedFilter));
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div id="container" className="flex column">
      <Navbar />
      <div id="typeDashboard" className="section flex column">
        <div className="flex row spacebetween">
          <p className="sectionHeading">Types</p>
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {error && <p className="errorMsg">{error}</p>}
        {loading && <p>Loading...</p>}
        <table>
          <thead>
            <tr>
              <th>Department Type</th>
              <th>Type Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTypes.map((type) => (
              <tr key={type._id}>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td className="centertd">
                  {type.status !== "approved" && (
                    <button
                      className="btn green rounded marg-6"
                      onClick={() => handleApprove(type._id)}
                      disabled={loading}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="btn red rounded marg-6"
                    onClick={() => handleDelete(type._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
