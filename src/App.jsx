import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SAdminOrg from './pages/SAdminOrg'
import SAdminType from './pages/SAdminType'
import OAdminDept from './pages/OAdminDept'
import OAdminCat from './pages/OAdminCat'
import TypeForm from './pages/components/TypeForm'
import CategoryForm from './pages/components/CategoryForm'
import OAdminEventForm from './pages/components/OAdminEventForm'
import DAdminEventForm from './pages/components/DAdminEventForm'
import OAdminEvent from './pages/OAdminEvent'
import DAdminEventView from './pages/DAdminEventView'

function App() {
  return (
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/s' element={<Signup />}></Route>
          <Route path='/user' element={<Signup />}></Route>
          <Route path='/org' element={<Signup />}></Route>
          <Route path='/dept' element={<Signup />}></Route>
          <Route path='/sadminorg' element={<SAdminOrg />}></Route>
          <Route path='/sadmintype' element={<SAdminType />}></Route>
          <Route path='/oadmindept' element={<OAdminDept />}></Route>
          <Route path='/oadmintype' element={<TypeForm />}></Route>
          <Route path='/oadmincat' element={<OAdminCat />}></Route>
          <Route path='/oadminevent' element={<OAdminEvent />}></Route>
          <Route path='/dadmineventreq' element={<DAdminEventForm />}></Route>
          <Route path='/dadmineventview' element={<DAdminEventView />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
