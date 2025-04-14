import React, { useState } from 'react';
import Navbar from './components/Navbar';
import '../App.css';
import OrganisationForm from './components/OrganisationForm';
import ViewOrganisation from './components/ViewOrganisation';
export default function SAdminOrg() {

  const [action, setAction] = useState('Create');

  return (
    <div id="container" className="flex column">
      <Navbar />
        <div className="section flex column">
            <div className="headingBar flex row spacebetween">
                <p className="sectionHeading">Organisations</p>
                <div className="flex row">
                    <button className='btn whiteBtn rounded' onClick={()=>setAction('Create')}> Create Organisation</button>
                    <button className='btn whiteBtn rounded' onClick={()=>setAction('View')}>Organisation Management</button>
                </div>
            </div>
            {action === 'Create' && (<OrganisationForm type="Create" />)}
            {action === 'View' && (<ViewOrganisation />)}
        </div>
          
    </div>
  );
}
