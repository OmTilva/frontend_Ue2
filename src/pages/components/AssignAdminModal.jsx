import React from "react";

export default function AssignAdminModal({ type, setModalView }) {
  return (
    <div className="borderBox modal flex column fitContent gap-24">
        <div className="flex row spacebetween">
            <p className="sectionHeading">Manage Admin</p>
            <button className="btn whiteBtn rounded" onClickCapture={()=>setModalView("")}>X</button>
        </div>
        <p className="errorMsg">Unable to Assign Admi</p>
        <p className="successMsg">Admin Assigned Successfully</p>
      <div className="vInputBox flexItem flex row gap-12 tvcenter spacebetween">
        <p className="inputLabel">{"Select " + type}</p>
        <select>
          <option>Select {" " + type}</option>
          <option>Type 1</option>
          <option>Type 2</option>
          <option>Type 3</option>
        </select>
      </div>
      <div className="vInputBox flexItem flex column">
        <p className="twrap">Mr. Rameswaram Swamy</p>
        <div className="flex row spacebetween gap-8">
            <input type="text" readOnly={true} value="Admin 1 Email" />
            <button className="btn green fb1">Update</button>
        </div>
      </div>
      <div className="vInputBox flexItem flex column">
        <p className="twrap">Mr. Rameswaram Swamy</p>
        <div className="flex row spacebetween gap-8">
            <input type="text" readOnly={true} value="Admin 1 Email" />
            <button className="btn green fb1">Update</button>
        </div>
      </div>
      <div className="vInputBox flexItem flex column">
        <p className="twrap">Mr. Rameswaram Swamy</p>
        <div className="flex row spacebetween gap-8">
            <input type="text" readOnly={true} value="Admin 1 Email" />
            <button className="btn green fb1">Update</button>
        </div>
      </div>
      <button className="btn blue">Save</button>
    </div>
  );
}
