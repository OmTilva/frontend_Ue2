import React, { useState } from "react";
import OrgCard from "./DeptCard";
import AssignAdminModal from "./AssignAdminModal";
import DeptCard from "./DeptCard";

export default function ViewDepartment() {
  return (
    <div className="section">
      <div className="filterbar flex row spacebetween">
        <div className="flex row gap-8">
          <select>
            <option>Select Department</option>
            <option>Dept 1</option>
            <option>Dept 1</option>
            <option>Dept 1</option>
          </select>
          <input type="text" placeholder="Enter Admin Email" />
          <button className="btn whiteBtn">Assign Admin</button>
        </div>
        <div className="flex row gap-8">
          <select>
            <option>Select Type</option>
            <option>Type 1</option>
            <option>Type 1</option>
            <option>Type 1</option>
          </select>
          <input type="text" placeholder="Search Department" />
          <button className="btn whiteBtn">Search</button>
        </div>
      </div>
      <div className="flex row fxwrap gap-8">
        <DeptCard />
        <DeptCard />
        <DeptCard />
        <DeptCard />
      </div>
    </div>
  );
}
