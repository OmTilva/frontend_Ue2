import React, { useState, useEffect } from "react";
import "../../App.css";
import AssignAdminModal from "./AssignAdminModal";

export default function DeptCard({ department, onEdit, onDelete }) {
  const [assignAdmin, setAssignAdmin] = useState("");
  const [adminNames, setAdminNames] = useState([]);
  const [memberDomain, setMemberDomain] = useState("N/A"); // State for memberDomain

  // Fetch admin names
  const fetchAdminNames = async () => {
    try {
      const adminIds = department.admins || [];
      const adminDetails = await Promise.all(
        adminIds.map(async (adminId) => {
          const response = await fetch(
            `http://localhost:5000/user/${adminId}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            return data.user.name;
          } else {
            console.error(`Failed to fetch admin with ID: ${adminId}`);
            return "Unknown Admin";
          }
        })
      );

      setAdminNames(adminDetails);
    } catch (error) {
      console.error("Error fetching admin names:", error);
    }
  };

  // Fetch organization details
  const fetchOrganizationDetails = async () => {
    try {
      if (!department.organization) {
        console.error("No organization ID found in department");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/org/${department.organization}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMemberDomain(data.organization.memberDomain || "N/A");
      } else {
        console.error("Failed to fetch organization details");
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  useEffect(() => {
    fetchAdminNames();
    fetchOrganizationDetails();
  }, [department.admins, department.organization]);

  return (
    <div className="orgCard">
      {assignAdmin && (
        <AssignAdminModal type={"Department"} setModalView={setAssignAdmin} />
      )}
      <h3 className="orgCardTitle">{department.name}</h3>
      <div className="orgCardDetails">
        <div className="orgCardRow">
          <span className="orgLabel">Type:</span>
          <span className="orgTag">{department.type}</span>
        </div>
        <div className="orgCardColumn">
          <span className="orgLabel">Description:</span>
          <span className="orgValue description">{department.description}</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Admin:</span>
          <span className="orgValue">
            {adminNames.length > 0
              ? adminNames.join(", ")
              : "No Admin Assigned"}
          </span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Members Domain:</span>
          <span className="orgValue">{memberDomain}</span>
        </div>
      </div>

      <div className="orgCardActions">
        <button className="orgBtn edit" onClick={() => onEdit(department)}>
          Edit
        </button>
        <button
          className="orgBtn assign"
          onClick={() => setAssignAdmin("Organisation Admin")}
        >
          Assign
        </button>
        <button
          className="orgBtn delete"
          onClick={() => onDelete(department._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
