import React, { useState } from 'react';
import Navbar from './components/Navbar';
import '../App.css';
export default function SAdminType() {

  return (
    <div id="container" className="flex column">
      <Navbar />
        <div id='typeDashboard' className="section flex column">
          <div className="flex row spacebetween">
          <p className="sectionHeading">Types</p>
          <select>
            <option>Filter by Status</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
          </div>
            <table>
              <tr>
                <th>Department Type</th>
                <th>Type Description</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Technical</td>
                <td>Lorem ipsum dolor sit amet</td>
                <td className='centertd'>
                  <button className='btn green rounded marg-6'>Approve</button>
                  <button className='btn red rounded marg-6'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Technical</td>
                <td>Lorem ipsum dolor sit amet</td>
                <td className='centertd'>
                  <button className='btn green rounded marg-6'>Approve</button>
                  <button className='btn red rounded marg-6'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Technical</td>
                <td>Lorem ipsum dolor sit amet</td>
                <td className='centertd'>
                  <button className='btn green rounded marg-6'>Approve</button>
                  <button className='btn red rounded marg-6'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Technical</td>
                <td>Lorem ipsum dolor sit amet</td>
                <td className='centertd'>
                  <button className='btn green rounded marg-6'>Approve</button>
                  <button className='btn red rounded marg-6'>Delete</button>
                </td>
              </tr>
            </table>
        </div>
          
    </div>
  );
}
