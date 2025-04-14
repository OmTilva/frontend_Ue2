import React from "react";
import "../../App.css";
import Navbar from "./Navbar";

export default function CategoryForm() {
  return (
    <div id="container" className="flex column">
      <Navbar />
      <div className="section flex column">
        <div className="headingBar flex row spacebetween">
          <p className="sectionHeading">Categories</p>
        </div>
      </div>
      <div id="type" className="section flex row fb1 centerb">
        <div className="borderBox flex column centerb gap-12">
          <p className="sectionHeading">Request Category</p>

          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Name</p>
              <input type="text" placeholder="e.g Technical" />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Description</p>
              <textarea type="text" placeholder="Description of the Category" />
            </div>
          </div>
          <button className="btn green">Request</button>
        </div>
      </div>
    </div>
  );
}
