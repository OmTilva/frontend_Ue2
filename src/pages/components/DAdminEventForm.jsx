import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../App.css";

export default function DAdminEventForm() {
  return (
    <div id="container" className="flex column">
      <Navbar />
      <div id="signup" className="section flex row fb1 spaceAround">
        <div className="borderBox flex column centerb gap-12">
          <div className="flex row spacebetween">
          <p className="sectionHeading">Event</p>
          <p className="successMsg">Suggested Category Is: </p>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Title</p>
              <input type="text" placeholder="e.g. Event Title" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Category</p>
              <select>
                <option value="">Select Category</option>
                <option value="nationality1">Male</option>
                <option value="nationality2">Female</option>
                <option value="nationality3">Other</option>
              </select>
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Description</p>
              <textarea placeholder="e.g. Event Description" />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Start Date</p>
              <input type="date" placeholder="Select Start Date" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">End Date</p>
              <input type="date" placeholder="Select End Date" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Start Time</p>
              <input type="time" placeholder="Select Start Time" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">End Time</p>
              <input type="time" placeholder="Select End Time" />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">No of Days</p>
              <input type="number" placeholder="e.g. 3" min={1} />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Collaboration</p>
              <input type="text" placeholder="e.g. Collaboration Details" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Budget Type</p>
              <input type="text" placeholder="e.g. Fixed or Variable" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Budget Amount</p>
              <input type="number" placeholder="e.g. 1000" min={0} />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Venue</p>
              <input type="text" placeholder="e.g. Event Venue" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Mode</p>
              <select>
                <option>Offline</option>
                <option>Online</option>
                <option>Hybrid</option>
              </select> 
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Max Participants</p>
              <input type="number" placeholder="e.g. 50" min={0} />
            </div>
          </div>
          <div className="flex row">
            <button className="btn red fb1">Cancel</button>
            <button className="btn gold fb1">Verify</button>
            <button className="btn green fb1">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
