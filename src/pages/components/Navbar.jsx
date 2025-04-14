import React, {useEffect, useState } from 'react'

export default function Navbar() {
   
  return (
    <div id='navbar' className='flex mobileRow spacebetween'>
        <div className="logoTxt">UrEvent</div>
        <div id="navMenu" className='flex row vcenter gap-12'>
          <p className="navMenuItem noMobile">Department</p>
          <p className="navMenuItem noMobile">Type</p>
          <p className="navMenuItem noMobile">Category</p>
          <p className="navMenuItem noMobile">Event</p>
          <p className="navMenuItem Mobile">M</p>
        </div>
    </div>
  )
}
