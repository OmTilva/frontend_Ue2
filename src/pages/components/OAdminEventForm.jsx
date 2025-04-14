import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../App.css";

export default function OAdminEventForm() {
  return (
    <div id="container" className="flex column">
      <Navbar />
      <div id="signup" className="section flex row fb1 spaceAround">
        <div className="borderBox flex column centerb gap-12">
          <div className="sectionHeading">Event</div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Department</p>
              <input type="text" placeholder="e.g. Department Name" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Proposed By</p>
              <input type="text" placeholder="e.g. Proposed By Name" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Title</p>
              <input type="text" placeholder="e.g. Event Title" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Category</p>
              <select>
                <option value="">Select Category</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Description</p>
              <textarea placeholder="e.g. Event Description"></textarea>
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
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Reg Start Date</p>
              <input type="date" placeholder="Select Registration Start Date" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Reg End Date</p>
              <input type="date" placeholder="Select Registration End Date" />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">No of Days</p>
              <input type="number" placeholder="e.g. Number of Days" min={1} />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Collaboration</p>
              <input type="text" placeholder="e.g. Collaboration Details" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Budget Type</p>
              <input type="text" placeholder="e.g. Budget Type" />
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Budget Amount</p>
              <input type="number" placeholder="e.g. Budget Amount" min={0} />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Venue</p>
              <input type="text" placeholder="e.g. Venue Name" />
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
              <input type="number" placeholder="e.g. Maximum Participants" min={0} />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Certificate Required</p>
              <select>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Approval Status</p>
              <select>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Event Status</p>
              <select>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="freezed">Freezed</option>
              </select>
            </div>
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Remarks</p>
              <input type="text" placeholder="e.g. Remarks" />
            </div>
          </div>
          <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
              <p className="inputLabel">Tags</p>
              <div className="flex row">
                <div className="interestCard">tag 1</div>
                <div className="interestCard">tag 2</div>
                <div className="interestCard">tag 3</div>
              </div>
            </div>
          </div>
          <div className="flex row">
            <button className="btn red fb1">Cancel</button>
            <button className="btn green fb1">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
