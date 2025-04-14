import React from 'react'
import '../../App.css'


export default function DepartmentForm({type}) {
  return (
    <div id="organisation" className="section flex row fb1 centerb">
        <div className="borderBox flex column centerb gap-12">
        <p className="sectionHeading">{type} Deaprtment</p>

        {/* Name & Email */}
        <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
            <p className="inputLabel">Name</p>
            <input type="text" placeholder="e.g John Doe" />
            </div>
            <div className="vInputBox flexItem flex column">
            <p className="inputLabel">Type</p>
            <select>
                <option>Select Type</option>
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
            </select>
            </div>
        </div>
        <div className="flexRowSplit">
            <div className="vInputBox flexItem flex column">
                <p className="inputLabel">Description</p>
                <textarea type="text" placeholder="Description of the department" />
            </div>
        </div>
        <button className="btn transparentBtn">
            {type === 'Create' ? 'Submit' : 'Update'}
        </button>
    </div>
  </div>
  )
}
