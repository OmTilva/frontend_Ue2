import React, { useState } from 'react';
import Navbar from './components/Navbar';
import '../App.css';
import DepartmentForm from './components/DepartmentForm';
import ViewDepartment from './components/ViewDepartment';

export default function OAdminDept() {

  const [action, setAction] = useState('Create');

  return (
    <div id="container" className="flex column">
      <Navbar />
        <div className="section flex column">
            <div className="headingBar flex row spacebetween">
                <p className="sectionHeading">Departments</p>
                <div className="flex row">
                    <button className='btn whiteBtn rounded' onClick={()=>setAction('Create')}> Create Department</button>
                    <button className='btn whiteBtn rounded' onClick={()=>setAction('View')}>Department Management</button>
                </div>
            </div>
            {action === 'Create' && (<DepartmentForm type="Create" />)}
            {action === 'View' && (<ViewDepartment />)}
        </div>

    </div>
  );
}
