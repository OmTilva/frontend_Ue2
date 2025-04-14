import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import AssignAdminModal from "./AssignAdminModal";

export default function OrgCard({ org, refreshOrganizations }) {
  const [assignAdmin, setAssignAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEdit = () => {
    // Refresh the page and redirect to /sadminorg with the organization's data
    window.location.href = `/sadminorg?action=Update&orgId=${org._id}`;
  };

  const handleFetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/org/${org._id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admins");
      }

      setAdmins(data.organization.admins || []);
      setAssignAdmin(true); // Open the modal
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this organization?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/org/${org._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete organization");
      }

      alert("Organization deleted successfully!");
      refreshOrganizations(); // Refresh the list of organizations
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orgCard">
      {assignAdmin && (
        <AssignAdminModal
          type={"Organisation"}
          setModalView={setAssignAdmin}
          admins={admins}
          org={org}
          refreshOrganizations={refreshOrganizations}
        />
      )}
      <h3 className="orgCardTitle">{org.name}</h3>
      <div className="orgCardDetails">
        <div className="orgCardRow">
          <span className="orgLabel">Email:</span>
          <span className="orgValue">{org.email}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Address:</span>
          <span className="orgValue">{org.address}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">City:</span>
          <span className="orgValue">{org.city}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">State:</span>
          <span className="orgValue">{org.state}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">PoC Name:</span>
          <span className="orgValue">{org.poc}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Contact No:</span>
          <span className="orgValue">{org.contact}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Admin:</span>
          <span className="orgValue">{org.admins?.join(", ") || "N/A"}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Members Domain:</span>
          <span className="orgValue">{org.memberDomain || "N/A"}</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="orgCardActions">
        <button className="orgBtn edit" onClick={handleEdit} disabled={loading}>
          {loading ? "Editing..." : "Edit"}
        </button>
        <button
          className="orgBtn assign"
          onClick={handleFetchAdmins}
          disabled={loading}
        >
          {loading ? "Loading..." : "Admins"}
        </button>
        <button
          className="orgBtn delete"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
