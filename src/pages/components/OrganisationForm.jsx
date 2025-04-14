import React, { useState, useEffect } from "react";
import "../../App.css";

export default function OrganisationForm({ type }) {
  const [formData, setFormData] = useState({
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the current admin's ID
  useEffect(() => {
    const fetchAdminId = async () => {
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
          throw new Error(data.message || "Failed to fetch admin details");
        }

        setFormData((prev) => ({
          ...prev,
          adminId: data._id, // Set the admin ID in the form data
        }));
      } catch (error) {
        setError("Failed to fetch admin details");
        console.error("Error fetching admin ID:", error);
      }
    };

    fetchAdminId();
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
      const response = await fetch("http://localhost:5000/org/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create organization");
      }

      alert("Organization created successfully!");
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
        adminId: formData.adminId, // Retain the admin ID
      });
    } catch (error) {
      setError(error.message || "An error occurred during organization creation");
      console.error("Error creating organization:", error);
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
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
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
            {loading ? "Submitting..." : type === "Create" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
