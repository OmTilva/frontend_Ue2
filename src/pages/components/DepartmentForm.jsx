// import React from 'react'
// import '../../App.css'

// export default function DepartmentForm({type}) {
//   return (
//     <div id="organisation" className="section flex row fb1 centerb">
//         <div className="borderBox flex column centerb gap-12">
//         <p className="sectionHeading">{type} Deaprtment</p>

//         {/* Name & Email */}
//         <div className="flexRowSplit">
//             <div className="vInputBox flexItem flex column">
//             <p className="inputLabel">Name</p>
//             <input type="text" placeholder="e.g John Doe" />
//             </div>
//             <div className="vInputBox flexItem flex column">
//             <p className="inputLabel">Type</p>
//             <select>
//                 <option>Select Type</option>
//                 <option>Type 1</option>
//                 <option>Type 2</option>
//                 <option>Type 3</option>
//             </select>
//             </div>
//         </div>
//         <div className="flexRowSplit">
//             <div className="vInputBox flexItem flex column">
//                 <p className="inputLabel">Description</p>
//                 <textarea type="text" placeholder="Description of the department" />
//             </div>
//         </div>
//         <button className="btn transparentBtn">
//             {type === 'Create' ? 'Submit' : 'Update'}
//         </button>
//     </div>
//   </div>
//   )
// }
import React, { useState, useEffect } from "react";
import "../../App.css";

export default function DepartmentForm({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    adminId: "",
    orgId: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current user's organizations and all users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userResponse = await fetch("http://localhost:5000/auth/current", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const currentUser = await userResponse.json();
        if (!userResponse.ok) {
          throw new Error(
            currentUser.message || "Failed to fetch current user"
          );
        }

        // Fetch organizations where the current user is an admin
        const orgResponse = await fetch("http://localhost:5000/org/all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orgData = await orgResponse.json();
        if (!orgResponse.ok) {
          throw new Error(orgData.message || "Failed to fetch organizations");
        }

        // Filter organizations where the current user is an admin
        const filteredOrganizations = orgData.organizations.filter((org) =>
          org.admins.includes(currentUser._id)
        );
        setOrganizations(filteredOrganizations);

        // Fetch all users
        const usersResponse = await fetch("http://localhost:5000/user/all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const usersData = await usersResponse.json();
        if (!usersResponse.ok) {
          throw new Error(usersData.message || "Failed to fetch users");
        }
        setUsers(usersData.users);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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
      const endpoint =
        type === "Create"
          ? "http://localhost:5000/department/create"
          : `http://localhost:5000/department/${formData.deptId}/edit`;

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
        throw new Error(data.message || "Failed to process department");
      }

      setSuccess(
        type === "Create"
          ? "Department created successfully!"
          : "Department updated successfully!"
      );
      setFormData({
        name: "",
        type: "",
        description: "",
        adminId: "",
        orgId: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="organisation" className="section flex row fb1 centerb">
      <div className="borderBox flex column centerb gap-12">
        <p className="sectionHeading">{type} Department</p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name & Type */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g John Doe"
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
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Description</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description of the department"
              />
            </div>
          </div>

          {/* Admin & Organization */}
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Admin</p>
              <select
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
                required
              >
                <option value="">Select Admin</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Organization</p>
              <select
                name="orgId"
                value={formData.orgId}
                onChange={handleChange}
                required
              >
                <option value="">Select Organization</option>
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn transparentBtn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? type === "Create"
                ? "Submitting..."
                : "Updating..."
              : type === "Create"
              ? "Submit"
              : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
