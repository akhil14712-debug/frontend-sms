import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'

import { createTeacher  ,updateTeacher} from '../../Services/TeacherService'

import { getTeacher } from '../../Services/TeacherService'

const AddTeacher = () => {
 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [qualification , setQualification] = useState("");
  const [error,setError] = useState({
    name:"",
    email:"",
    phone:"",
    qualification:""
  })

  const {id} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{
    if(id){
      getTeacher(id).then((res)=>{

        setName(res.data.tname);
        setEmail(res.data.temail);
        setPhone(res.data.tphone);
        setQualification(res.data.qualification);

      }).catch(err => {
        console.log(err)
      })
    }
  },[id])

  function saveOrUpdateTeacher(e){
    e.preventDefault();

    if(validateForm()){
      const teacher = {
    tname: name,
    temail: email,
    tphone: phone,
    qualification: qualification
}
      console.log(teacher)

      if(id){
        updateTeacher(id,teacher).then((res)=>{
          console.log(res.data);
          navigate('/teachers');
        }).catch(err=>{
          console.error(err);
        })
      }else{
          createTeacher(teacher).then((res)=> {
            console.log(res.data)
            navigate('/teachers')
          }).catch(err=>{
            console.err(err)});
        }
    }
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = {... error}

    
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
    if(qualification.trim()){
      errorsCopy.qualification = '';
    }else{
      errorsCopy.qualification = 'Qualification is required';
      valid = false;
    }

    setError(errorsCopy);
    return valid;
  }

  function pageTitle(){
    if(id){
      return <h2 className="form__title">Update Teacher</h2>
    }else{
      return <h2 className="form__title">Add Teacher</h2>
    }
  }


 

  return (
    <div className="form-container">
      <div className="form">
        {
          pageTitle()
        }
        <p className="form__subtitle">Fill in the details to add a new Teacher</p>

        <form onSubmit={saveOrUpdateTeacher}>
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
            <label className="form__label">Teacher Name</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Teacher Email</label>
            <input
              className="form__input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Teacher Phone</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label className="form__label">Teacher Qualification</label>
            <input
              className="form__input"
              type="text"
              placeholder="Enter Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
          </div>

          <div className="form__actions">
            <button
              type="button"
              className="form__btn-cancel"
              onClick={() => navigate('/teachers')}
            >
              Cancel
            </button>
            <button type="submit" className="form__btn-submit" >
              Save Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTeacher