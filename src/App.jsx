import React, { useState } from 'react'
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import ListStudent from './Components/Students/ListStudent';

import './Style/global.css'
import AddStudent from './Components/Students/AddStudent';
import ListCourse from './Components/Cources/ListCourse';
import AddCourse from './Components/Cources/AddCourse';

const App = () => {
  const [active,setActive] = useState("Dashboard")

  return (
    <BrowserRouter>
    <div className="app">
      <Sidebar active={active} setActive={setActive}/>
      <div className="app__right">
        <div className="navbar">
        <span className="navbar_title">Student Management System</span>
      </div>
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/students" element={<ListStudent/>}></Route>
          <Route path="/students/add" element={<AddStudent/>}></Route>
          <Route path="/update-student/:id" element={<AddStudent/>}></Route>
          <Route path="/courses" element={<ListCourse/>}></Route>
          <Route path="/courses/add" element={<AddCourse/>}></Route>
          <Route path="update-course/:courseId" element={<AddCourse/>}></Route>
        </Routes>
        </div>
      </div>
      
    </div>
    </BrowserRouter>
    
  
  )
}

export default App