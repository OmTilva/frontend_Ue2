import React, { useState, useEffect } from "react";
import DeptCard from "./DeptCard";

export default function ViewDepartment() {
  const [departments, setDepartments] = useState([]);
  const [approvedTypes, setApprovedTypes] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [error, setError] = useState("");

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:5000/department", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch departments");
      }

      setDepartments(data.departments);
      setFilteredDepartments(data.departments); // Initialize filtered departments
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to fetch departments");
    }
  };

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

  // Assign admin to a department
  const handleAssignAdmin = async () => {
    try {
      if (!selectedDepartment || !adminEmail) {
        alert("Please select a department and enter an admin email");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/department/${selectedDepartment}/assign-admin`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminEmail }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to assign admin");
      }

      alert("Admin assigned successfully!");
      setAdminEmail("");
    } catch (error) {
      console.error("Error assigning admin:", error);
      alert(error.message || "An error occurred while assigning admin");
    }
  };

  // Filter departments based on type or search query
  const handleSearch = () => {
    let filtered = departments;

    if (selectedType) {
      filtered = filtered.filter((dept) => dept.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter((dept) =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDepartments(filtered);
  };

  // Handle delete functionality
  const handleDelete = async (deptId) => {
    if (!window.confirm("Are you sure you want to delete this department?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/department/${deptId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete department");
      }

      alert("Department deleted successfully!");
      fetchDepartments(); // Refresh the department list
    } catch (error) {
      console.error("Error deleting department:", error);
      alert(error.message || "An error occurred while deleting the department");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchApprovedTypes();
  }, []);

  return (
    <div className="section">
      <div className="filterbar flex row spacebetween">
        <div className="flex row gap-8">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <button className="btn whiteBtn" onClick={handleAssignAdmin}>
            Assign Admin
          </button>
        </div>
        <div className="flex row gap-8">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            {approvedTypes.map((type) => (
              <option key={type._id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search Department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn whiteBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="flex row fxwrap gap-8">
        {filteredDepartments.map((dept) => (
          <DeptCard
            key={dept._id}
            department={dept}
            onDelete={handleDelete} // Pass the delete handler to DeptCard
          />
        ))}
      </div>
    </div>
  );
}
