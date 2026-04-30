import React, { useState } from 'react'
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import ListStudent from './Components/Students/ListStudent';

import './Style/global.css'
import AddStudent from './Components/Students/AddStudent';
import ListCourse from './Components/Cources/ListCourse';
import AddCourse from './Components/Cources/AddCourse';
import AddTeacher from './Components/Teachers/AddTeacher';
import ListTeacher from './Components/Teachers/ListTeacher';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddEnrollment from './Components/Enrollments/AddEnrollment';
import ListEnrollment from './Components/Enrollments/ListEnrollment';
import Login from './Components/Login';




const App = () => {
  const [active,setActive] = useState("Dashboard")

  return (
    <>
    <BrowserRouter>
    <div className="app">
      <Sidebar active={active} setActive={setActive}/>
      <div className="app__right">
        <div className="navbar">
        <span className="navbar_title">Student Data & Performance Tracker</span>
      </div>
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/students" element={<ListStudent/>}></Route>
          <Route path="/students/add" element={<AddStudent/>}></Route>
          <Route path="/update-student/:id" element={<AddStudent/>}></Route>
          <Route path="/courses" element={<ListCourse/>}></Route>
          <Route path="/courses/add" element={<AddCourse/>}></Route>
          <Route path="update-course/:id" element={<AddCourse/>}></Route>
          <Route path="/teachers" element={<ListTeacher/>}></Route>
          <Route path="/teachers/add" element={<AddTeacher/>}></Route>
          <Route path="/update-teacher/:id" element={<AddTeacher/>}></Route>
          <Route path="/enrollment" element={<ListEnrollment/>}></Route>
          <Route path="/enrollment/add" element={<AddEnrollment/>}></Route>
          <Route path="/update-enrollment/:id" element={<AddEnrollment/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
        </div>
      </div>
      
    </div>
    </BrowserRouter>

     <ToastContainer position="top-right" autoClose={3000} />
    
    
    </>
  
  )
}

export default App