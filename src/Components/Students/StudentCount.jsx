import React, { useState } from 'react'
import axios from 'axios';
import Dashboard from '../Dashboard';

const StudentCount = () => {
    
  return (
    <>
    <Dashboard count={count}/>
    </>
  )
}

export default StudentCount