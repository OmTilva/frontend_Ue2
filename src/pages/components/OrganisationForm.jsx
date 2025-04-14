import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";

export default function OrganisationForm({ type, orgData }) {
  const [formData, setFormData] = useState({
    name: orgData?.name || "",
    email: orgData?.email || "",
    type: orgData?.type || "",
    address: orgData?.address || "",
    city: orgData?.city || "",
    state: orgData?.state || "",
    poc: orgData?.poc || "",
    contact: orgData?.contact || "",
    memberDomain: orgData?.memberDomain || "",
    adminId: orgData?.adminId || "",
  });

  const [approvedTypes, setApprovedTypes] = useState([]); // State to store approved types
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch approved types from the backend
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

      // Filter types with status "approved"
      const approved = data.types.filter((type) => type.status === "approved");
      setApprovedTypes(approved);
    } catch (error) {
      console.error("Error fetching approved types:", error);
      setError("Failed to fetch approved types");
    }
  };

  useEffect(() => {
    fetchApprovedTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        type === "Create"
          ? "http://localhost:5000/org/create"
          : `http://localhost:5000/org/${orgData._id}/edit`;

      const method = type === "Create" ? "POST" : "PATCH";

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
        throw new Error(data.message || "Failed to process organization");
      }

      alert(
        type === "Create"
          ? "Organization created successfully!"
          : "Organization updated successfully!"
      );

      setFormData({
        name: "",
        email: "",
        type: "",
        address: "",
        city: "",
        state: "",
        poc: "",
        contact: "",
        memberDomain: "",
        adminId: "",
      });
    } catch (error) {
      setError(
        error.message || "An error occurred during organization processing"
      );
      console.error("Error processing organization:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="organisation" className="section flex row fb1 centerb">
      <div className="borderBox flex column centerb gap-12">
        <p className="sectionHeading">{type} Organisation</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g John Doe"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Email</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g abc@info.com"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Type</p>
              <select name="type" value={formData.type} onChange={handleChange}>
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
              <p className="inputLabel">Address</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g Luxemborg Street"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">City</p>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g Alexandara"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">State</p>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                <option value="State 1">State 1</option>
                <option value="State 2">State 2</option>
                <option value="State 3">State 3</option>
              </select>
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">PoC Name</p>
              <input
                type="text"
                name="poc"
                value={formData.poc}
                onChange={handleChange}
                placeholder="e.g John Doe"
              />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Contact No</p>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g 9876543210"
              />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Domain for Members</p>
              <input
                type="text"
                name="memberDomain"
                value={formData.memberDomain}
                onChange={handleChange}
                placeholder="e.g @orgname.ac.in"
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
              : type === "Create"
              ? "Submit"
              : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
