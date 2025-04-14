import React, { useRef, useState } from "react";

export default function AssignAdminModal({
  type,
  setModalView,
  admins,
  org,
  refreshOrganizations,
}) {
  const [editableInputs, setEditableInputs] = useState({});
  const [selectedOrg, setSelectedOrg] = useState(org.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create refs for each input
  const emailRefs = useRef({});

  const getEmailValue = (admin) => {
    // Adjust this if email is deeply nested
    return typeof admin.email === "string"
      ? admin.email
      : admin.email?.email || "";
  };

  const handleEditClick = (adminId) => {
    setEditableInputs((prev) => ({ ...prev, [adminId]: true }));
  };

  const handleUpdateAdmin = async (adminId) => {
    const newEmail = emailRefs.current[adminId]?.value || "";

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("http://localhost:5000/org/edit-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orgId: org._id, adminId, newEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update admin");
      }

      setSuccess("Admin email updated successfully!");
      refreshOrganizations();

      setEditableInputs((prev) => ({ ...prev, [adminId]: false }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="borderBox modal flex column fitContent gap-24">
      <div className="flex row spacebetween">
        <p className="sectionHeading">Manage Admin</p>
        <button
          className="btn whiteBtn rounded"
          onClick={() => setModalView(false)}
        >
          X
        </button>
      </div>

      {error && <p className="errorMsg">{error}</p>}
      {success && <p className="successMsg">{success}</p>}

      <div className="vInputBox flexItem flex row gap-12 tvcenter spacebetween">
        <p className="inputLabel">{"Select " + type}</p>
        <select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          <option value={org.name}>{org.name}</option>
        </select>
      </div>

      {admins.map((admin) => {
        const isEditable = editableInputs[admin._id] || false;
        const email = getEmailValue(admin);

        return (
          <div key={admin._id} className="vInputBox flexItem flex column">
            <p className="twrap">Admin ID: {admin._id}</p>
            <div className="flex row spacebetween gap-8">
              <input
                type="text"
                defaultValue={email}
                readOnly={!isEditable}
                ref={(el) => (emailRefs.current[admin._id] = el)}
                placeholder="Enter Admin Email"
              />
              {!isEditable ? (
                <button
                  className="btn green fb1"
                  onClick={() => handleEditClick(admin._id)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="btn green fb1"
                  onClick={() => handleUpdateAdmin(admin._id)}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save"}
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button className="btn blue" onClick={() => setModalView(false)}>
        Close
      </button>
    </div>
  );
}
