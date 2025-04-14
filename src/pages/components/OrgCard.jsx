import React, { useState } from "react";
import "../../App.css";
import AssignAdminModal from "./AssignAdminModal";

export default function OrgCard() {
  const [assignAdmin, setAssignAdmin] = useState("");

  return (
    <div className="orgCard">
      {assignAdmin && (
        <AssignAdminModal type={"Organisation"} setModalView={setAssignAdmin} />
      )}
      <h3 className="orgCardTitle">Organisation Name</h3>
      <div className="orgCardDetails">
        <div className="orgCardRow">
          <span className="orgLabel">Email:</span>
          <span className="orgValue">org@example.com</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Address:</span>
          <span className="orgValue">123 Main Street</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">City:</span>
          <span className="orgValue">New York</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">State:</span>
          <span className="orgValue">NY</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">PoC Name:</span>
          <span className="orgValue">Jane Doe</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Contact No:</span>
          <span className="orgValue">9876543210</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Admin:</span>
          <span className="orgValue">a@x.com</span>
        </div>
        <div className="orgCardRow">
          <span className="orgLabel">Members Domain:</span>
          <span className="orgValue">@orgname.ac.in</span>
        </div>
      </div>

      <div className="orgCardActions">
        <button className="orgBtn edit">Edit</button>
        <button
          className="orgBtn assign"
          onClick={() => setAssignAdmin("Organisation Id")}
        >
          Admins
        </button>
        <button className="orgBtn delete">Delete</button>
      </div>
    </div>
  );
}
