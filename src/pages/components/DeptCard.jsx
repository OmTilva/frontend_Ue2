import React, { useState } from "react";
import "../../App.css";
import AssignAdminModal from "./AssignAdminModal";

export default function DeptCard() {
  const [assignAdmin, setAssignAdmin] = useState("");

  return (
    <div className="orgCard">
      {assignAdmin && (
        <AssignAdminModal type={"Department"} setModalView={setAssignAdmin} />
      )}
      <h3 className="orgCardTitle">Department Name</h3>
      <div className="orgCardDetails">
        <div className="orgCardRow">
          <span className="orgLabel">Type:</span>
          <span className="orgTag">Technical</span>
        </div>
        <div className="orgCardColumn">
          <span className="orgLabel">Description:</span>
          <span className="orgValue description">
            dlcncdsncsnkjdsnsnvdskvndskvnskvnskvnskdsnvkjdsnvsdnvkjsvsvndsklvsvsvn
            skvjsnvksnvksnksnvsjvnskjvnsdvndskjvnskjvndsvkjs
          </span>
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
        <button className="orgBtn assign" onClick={()=>setAssignAdmin("Organisation Admin")}>Assign</button>
        <button className="orgBtn delete">Delete</button>
      </div>
    </div>
  );
}
