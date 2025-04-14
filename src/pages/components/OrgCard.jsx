// import React, { useState } from "react";
// import "../../App.css";
// import AssignAdminModal from "./AssignAdminModal";

// export default function OrgCard() {
//   const [assignAdmin, setAssignAdmin] = useState("");

//   return (
//     <div className="orgCard">
//       {assignAdmin && (
//         <AssignAdminModal type={"Organisation"} setModalView={setAssignAdmin} />
//       )}
//       <h3 className="orgCardTitle">Organisation Name</h3>
//       <div className="orgCardDetails">
//         <div className="orgCardRow">
//           <span className="orgLabel">Email:</span>
//           <span className="orgValue">org@example.com</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">Address:</span>
//           <span className="orgValue">123 Main Street</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">City:</span>
//           <span className="orgValue">New York</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">State:</span>
//           <span className="orgValue">NY</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">PoC Name:</span>
//           <span className="orgValue">Jane Doe</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">Contact No:</span>
//           <span className="orgValue">9876543210</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">Admin:</span>
//           <span className="orgValue">a@x.com</span>
//         </div>
//         <div className="orgCardRow">
//           <span className="orgLabel">Members Domain:</span>
//           <span className="orgValue">@orgname.ac.in</span>
//         </div>
//       </div>

//       <div className="orgCardActions">
//         <button className="orgBtn edit">Edit</button>
//         <button
//           className="orgBtn assign"
//           onClick={() => setAssignAdmin("Organisation Id")}
//         >
//           Admins
//         </button>
//         <button className="orgBtn delete">Delete</button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import "../../App.css";
import AssignAdminModal from "./AssignAdminModal";

export default function OrgCard({ org, refreshOrganizations }) {
  const [assignAdmin, setAssignAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = async () => {
    const updatedData = {
      name: org.name,
      email: org.email,
      type: org.type,
      address: org.address,
      city: org.city,
      state: org.state,
      poc: org.poc,
      contact: org.contact,
      memberDomain: org.memberDomain,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/org/${org._id}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to edit organization");
      }

      alert("Organization updated successfully!");
      refreshOrganizations(); // Refresh the list of organizations
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
          onAssign={refreshOrganizations}
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
          onClick={() => setAssignAdmin(true)}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Admins"}
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
