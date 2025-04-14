import React, { useState, useEffect } from "react";
import "../../App.css";

export default function DepartmentForm({ department, onClose }) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    type: department?.type || "",
    description: department?.description || "",
    adminId: "", // To be fetched
    orgId: "", // To be fetched
  });
  const [approvedTypes, setApprovedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch approved types
  const fetchApprovedTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/type", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch approved types");
      }

      const approved = data.types.filter((type) => type.status === "approved");
      setApprovedTypes(approved);
    } catch (error) {
      console.error("Error fetching approved types:", error);
      setError("Failed to fetch approved types");
    }
  };

  useEffect(() => {
    fetchApprovedTypes();
    fetchAdminAndOrg();
  }, []);

  const fetchAdminAndOrg = async () => {
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
        throw new Error(data.message || "Failed to fetch user info");
      }

      setFormData((prevData) => ({
        ...prevData,
        adminId: data._id,
        orgId: data.organizations[0], // Assuming orgId is part of the user object
      }));
    } catch (err) {
      console.error("Failed to fetch admin and org info:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = department
        ? `http://localhost:5000/department/${department._id}/edit`
        : "http://localhost:5000/department/create";
      const method = department ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save department");
      }

      setSuccess(
        department
          ? "Department updated successfully!"
          : "Department created successfully!"
      );
      onClose();
    } catch (error) {
      console.error("Error saving department:", error);
      setError(
        error.message || "An error occurred while saving the department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="department" className="section flex row fb1 centerb">
      <div className="borderBox flex column centerb gap-12">
        <p className="sectionHeading">
          {department ? "Update Department" : "Create Department"}
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g Department Name"
                required
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Type</p>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {approvedTypes.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Description</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g Description of the department"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn transparentBtn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : department
              ? "Update Department"
              : "Create Department"}
          </button>
          <button
            type="button"
            className="btn transparentBtn"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
