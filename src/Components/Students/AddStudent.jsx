import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import { createStudent, updateStudent } from '../../Services/StudentService'

import { getStudent } from '../../Services/StudentService'

const AddStudent = () => {
  const [studentId, setStudentId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error,setError] = useState({
    studentId:"",
    name:"",
    email:"",
    phone:""
  })

  const {id} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{
    if(id){
      getStudent(id).then((res)=>{
        setStudentId(res.data.studentId);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);

      }).catch(err => {
        console.log(err)
      })
    }
  },[id])

  function saveOrUpdateStudent(e){
    e.preventDefault();

    if(validateForm()){
      const student = {studentId,name,email,phone}
      console.log(student)

      if(id){
        updateStudent(id,student).then((res)=>{
          console.log(res.data);
          navigate('/students');
        }).catch(err=>{
          console.error(err);
        })
      }else{
          createStudent(student).then((res)=> {
            console.log(res.data)
            navigate('/students')
          }).catch(err=>{
            console.err(err)});
        }
    }
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = {... error}

    if(studentId.trim()){
      errorsCopy.studentId = '';
    }else{
      errorsCopy.studentId = 'StudentID is required';
      valid = false;
    }
    if(name.trim()){
      errorsCopy.name = '';
    }else{
      errorsCopy.name = 'Name is required';
      valid = false;
    }
    if(email.trim()){
      errorsCopy.email = '';
    }else{
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    if(phone.trim()){
      errorsCopy.phone = '';
    }else{
      errorsCopy.phone = 'Phone is required';
      valid = false;
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
          <div className="form__group">
            <label className="form__label">Student ID</label>
            <input
              className="form__input"
              type="text"
              placeholder="e.g. FIT21"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

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