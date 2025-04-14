import React, { useState, useEffect } from "react";
import OrgCard from "./OrgCard";

export default function ViewOrganisation() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all organizations on component mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("http://localhost:5000/org/all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch organizations");
        }

        setOrganizations(data.organizations);
        setFilteredOrganizations(data.organizations); // Initialize filtered organizations
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrganizations();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = organizations.filter((org) =>
      org.name.toLowerCase().includes(term)
    );
    setFilteredOrganizations(filtered);
  };

  const handleAssignAdmin = async () => {
    if (!selectedOrg || !adminEmail) {
      setError("Please select an organization and provide an admin email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("http://localhost:5000/org/assign-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: selectedOrg, email: adminEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to assign admin");
      }

      setSuccess("Admin assigned successfully!");
      setAdminEmail("");
      setSelectedOrg("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="filterbar flex row spacebetween">
        <div className="flex row gap-8">
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
          >
            <option value="">Select Organisation</option>
            {organizations.map((org) => (
              <option key={org._id} value={org.name}>
                {org.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <button
            className="btn whiteBtn"
            onClick={handleAssignAdmin}
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Admin"}
          </button>
        </div>
        <div className="flex row gap-8">
          <input
            type="text"
            placeholder="Search Organisation"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn whiteBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {error && <p className="errorMsg">{error}</p>}
      {success && <p className="successMsg">{success}</p>}

      <div className="flex row fxwrap gap-8">
        {filteredOrganizations.map((org) => (
          <OrgCard key={org._id} org={org} />
        ))}
      </div>
    </div>
  );
}
