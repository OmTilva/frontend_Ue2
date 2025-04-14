import React, { useState } from "react";
import "../../App.css";
import Navbar from "./Navbar";

export default function TypeForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
    setSuccess(""); // Clear success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/type/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add type");
      }

      setSuccess("Type added successfully!");
      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className="flex column">
      <Navbar />
      <div className="section flex column">
        <div className="headingBar flex row spacebetween">
          <p className="sectionHeading">Types</p>
        </div>
      </div>
      <div id="type" className="section flex row fb1 centerb">
        <div className="borderBox flex column centerb gap-12">
          <p className="sectionHeading">Request Type</p>

          {error && <p className="errorMsg">{error}</p>}
          {success && <p className="successMsg">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="flexRowSplit">
              <div className="vInputBox flexItem flex column">
                <p className="inputLabel">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g Type Name"
                  required
                />
              </div>
            </div>
            <div className="flexRowSplit">
              <div className="vInputBox flexItem flex column">
                <p className="inputLabel">Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description of the type"
                  required
                />
              </div>
            </div>
            <button className="btn green" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
