import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../Services/CourseSerive';

const AddCourse = () => {
   
    const [courseName,setCourseName] = useState("")
    const [instructor,setInstructor] = useState("");
    const [duration,setDuration] = useState("")
    const [fee,setFee] = useState()

    const navigate = useNavigate();
    
    function saveCourse(e){
        e.preventDefault();
        const course = {courseName,instructor,duration,fee}
        createCourse(course)
        .then((res)=>{
            console.log(res.data)
            navigate('/courses')
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    const id = false;

    function pageTitle(){
        if(id){
            return <h2 className="form__title">Update Course</h2>
        }else{
            return <h2 className="form__title">Add Course</h2>
        }
    }

  return (
    <div className="form-container">
        <div className="form">
            {
                pageTitle()
            }
            <p className="form__subtitle">Fill in the details to add a new course</p>
            <form onSubmit={saveCourse}>
                <div className="form__group">
                    <label className="form__label">Course Name</label>
                    <input className="form__input" type="text" value={courseName} onChange={(e)=>setCourseName(e.target.value)}></input>
                </div>
                <div className="form__group">
                    <label className="form__label">Instructor Name</label>
                    <input className="form__input" type="text" value={instructor} onChange={(e)=>setInstructor(e.target.value)}></input>
                </div>
                <div className="form__group">
                    <label className="form__label">Duration</label>
                    <input className="form__input" type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}></input>
                </div>
                <div className="form__group">
                    <label className="form__label">Fees</label>
                    <input className="form__input" type="text" value={fee} onChange={(e)=>setFee(e.target.value)}></input>
                </div>
                <div className="form__actions">
                    <button type="button" className="form__btn-cancel" onClick={()=>navigate('/courses')}>Cancel</button>
                    <button type="submit" className="form__btn-submit">Save Course</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddCourse