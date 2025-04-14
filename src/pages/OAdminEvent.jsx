import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "../App.css";
export default function OAdminEvent() {
  return (
    <div id="container" className="flex column">
      <Navbar />
      <div id="typeDashboard" className="section flex column">
        <div className="flex row spacebetween">
          <p className="sectionHeading">Event Requests</p>
          <div className="flex row">
            <select>
              <option>Filter by Department</option>
              <option>Dept 1</option>
              <option>Dept 1</option>
              <option>Dept 1</option>
            </select>
            <select>
              <option>Select Category</option>
              <option>Category 1</option>
              <option>Category 1</option>
              <option>Category 1</option>
            </select>
            <select>
              <option>Select Mode</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
            <input type="text" placeholder="Search Events" />
            <button className="btn whiteBtn">Search</button>
          </div>
        </div>
        <div className="flex end">
          <select>
            <option>Filter by Status</option>
            <option>Upcoming</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
          <select>
            <option>Filter by Approval Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
        <table>
          <tr>
            <th>Department</th>
            <th>Event Title</th>
            <th>Category</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Mode</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>Dept 1</td>
            <td>Sample Event</td>
            <td>Category 1</td>
            <td>2023-10-01</td>
            <td>2023-10-02</td>
            <td>10:00 AM</td>
            <td>4:00 PM</td>
            <td>Online</td>
            <td>
              <button className="btn blue">Edit</button>
            </td>
          </tr>
          <tr>
            <td>Dept 1</td>
            <td>Sample Event</td>
            <td>Category 1</td>
            <td>2023-10-01</td>
            <td>2023-10-02</td>
            <td>10:00 AM</td>
            <td>4:00 PM</td>
            <td>Online</td>
            <td>
              <button className="btn blue">Edit</button>
            </td>
          </tr>
          <tr>
            <td>Dept 1</td>
            <td>Sample Event</td>
            <td>Category 1</td>
            <td>2023-10-01</td>
            <td>2023-10-02</td>
            <td>10:00 AM</td>
            <td>4:00 PM</td>
            <td>Online</td>
            <td>
              <button className="btn blue">Edit</button>
            </td>
          </tr>
          <tr>
            <td>Dept 1</td>
            <td>Sample Event</td>
            <td>Category 1</td>
            <td>2023-10-01</td>
            <td>2023-10-02</td>
            <td>10:00 AM</td>
            <td>4:00 PM</td>
            <td>Online</td>
            <td>
              <button className="btn blue">Edit</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
