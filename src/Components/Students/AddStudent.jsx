import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import { createStudent, updateStudent } from '../../Services/StudentService'

import { getStudent } from '../../Services/StudentService'

import { toast } from 'react-toastify'

const AddStudent = () => {
   
  
  const [name, setName] = useState("")
  const [department ,setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error,setError] = useState({
 
    name:"",
    department:"",
    email:"",
    phone:""
  })

  

  const {id} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{
    if(id){
      getStudent(id).then((res)=>{
       
        setName(res.data.sname);
        setDepartment(res.data.department);
        setEmail(res.data.semail);
        setPhone(res.data.sphone);

      }).catch(err => {
        console.log(err)
      })
    }
  },[id])

  function saveOrUpdateStudent(e){
    e.preventDefault();

    if(validateForm()){
      const student = {
  
    sname: name,
    department: department,
    semail: email,
    sphone: phone
}
      console.log(student)

      if(id){
        updateStudent(id,student).then((res)=>{
          console.log(res.data);
          navigate('/students');
        }).catch(err=>{
          console.log(err);
        })
      }else{
          createStudent(student).then((res)=> {

            toast.success("Student created successfully! 🎉")
    setTimeout(() => {
        navigate('/students')  
    }, 6000)
            console.log(res.data)
            navigate('/students')
          }).catch(err=>{
              toast.error("Something went wrong! ❌")
            console.log(err)});
        }
    }
  }

  

  

   function validateForm() {
    let valid = true;
    const errorsCopy = { ...error }

    // ✅ Student ID — allow alphanumeric only (e.g. FIT21)
    // if (!studentId.trim()) {
    //   errorsCopy.studentId = 'Student ID is required';
    //   valid = false;
    // } else if (!/^[a-zA-Z0-9]+$/.test(studentId.trim())) {
    //   errorsCopy.studentId = 'Student ID can only contain letters and numbers';
    //   valid = false;
    // } else {
    //   errorsCopy.studentId = '';
    // }

    // ✅ Name — letters and spaces only, no dots or special chars
    if (!name.trim()) {
      errorsCopy.name = 'Name is required';
      valid = false;
    } else if (name.trim().length < 2) {
      errorsCopy.name = 'Name must be at least 2 characters';
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      errorsCopy.name = 'Name can only contain letters and spaces';
      valid = false;
    } else {
      errorsCopy.name = '';

      if (!department.trim()) {
      errorsCopy.department = 'Department is required';
      valid = false;
    } else if (department.trim().length < 2) {
      errorsCopy.name = 'Department must be at least 2 characters';
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(department.trim())) {
      errorsCopy.department = 'Department can only contain letters and spaces';
      valid = false;
    } else {
      errorsCopy.department = '';
    }
    }

    // ✅ Email — proper format check
    if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errorsCopy.email = 'Enter a valid email address';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    // ✅ Phone — numbers only, exactly 10 digits
    if (!phone.trim()) {
      errorsCopy.phone = 'Phone is required';
      valid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errorsCopy.phone = 'Phone must be exactly 10 digits';
      valid = false;
    } else {
      errorsCopy.phone = '';
    }

    setError(errorsCopy);
    return valid;
  }

  function pageTitle(){
    if(id){
      return <h2 className="form__title">Update Student</h2>
    }else{
      return <h2 className="form__title">Add Student</h2>
    }
  }


 

  return (
    <div className="form-container">

      

      <div className="form">
        {
          pageTitle()
        }
        <p className="form__subtitle">Fill in the details to add a new student</p>

        <form onSubmit={saveOrUpdateStudent}>
          {/* <div className="form__group">
            <label className="form__label">Student ID</label>
            <input
              className="form__input"
              type="text"
              placeholder="e.g. FIT21"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div> */}

          <div className="form__group">
            <label className="form__label">Student Name</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Student Department</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter full name"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Email</label>
            <input
              className="form__input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Phone</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form__actions">
            <button
              type="button"
              className="form__btn-cancel"
              onClick={() => navigate('/students')}
            >
              Cancel
            </button>
            <button type="submit" className="form__btn-submit" >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudent