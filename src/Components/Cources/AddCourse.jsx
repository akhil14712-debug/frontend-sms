import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom';
import { createCourse,updateCourse} from '../../Services/CourseSerive';
import { getCourse } from '../../Services/CourseSerive';
import { listTeacher } from '../../Services/TeacherService';
import { toast } from 'react-toastify'

const AddCourse = () => {
   
    const [courseName,setCourseName] = useState("")
    const [description , setDescription] = useState("")
    const [teacherId,setTeacherId] = useState();
    const [duration,setDuration] = useState("")
    const [fee,setFee] = useState("")
    const [teachers,setTeachers] = useState([])

  

    const [error,setError] = useState({
        courseName:"",
        description:"",
        duration:"",
        fee:"",
        teacherId:0
      })

    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(()=>{

        listTeacher().then((res)=>{
            setTeachers(res.data);
        })
        .catch(err=>console.log(err))
        if(id){
            getCourse(id).then((res)=>{
            setCourseName(res.data.courseName)
            setDescription(res.data.description)
            setDuration(res.data.duration)
            setFee(res.data.fee);
            setTeacherId(res.data.teacherId)
        }).catch(err=>{
            console.log(err);
        })
        }
        
    },[id])
    
    function saveOrUpdateCourse(e){
        
        e.preventDefault();
        
        if(validateForm()){
            const course = {
                courseName:courseName,
                description:description,
                fee:fee,
                duration:duration,
                teacherId:teacherId,
            }
            console.log(course)

            if(id){
                updateCourse(id,course).then((res)=>{
                    console.log(res.data);
                    navigate('/courses')
                }).catch((err)=>{
                    console.log(err)
                })
            }else{
                createCourse(course).then((res)=>{
                    console.log(res.data)
                    navigate('/courses')
                    toast.success("Course created successfully! 🎉")
                }).catch((err)=>{
                    toast.error("Something went wrong! ❌")
                    console.log(err);
                })
            }

        }
        
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {...error}

        if(courseName.trim()){
            errorCopy.courseName='';
        }else{
            errorCopy.courseName = 'Name is required';
            valid=false;
        }

        if(description.trim()){
            errorCopy.description = '';
        }else{
            errorCopy.description = 'Description is required'
             valid=false; 
        }

        if(duration.trim()){
            errorCopy.duration = '';
        }else{
            errorCopy.duration = 'Duration is required'
              valid=false;
        }

        //  if(fee.trim()){
        //     errorCopy.fee = '';
        // }else{
        //     errorCopy.fee = 'Fees is required'
        //       valid=false;
        // }

        setError(errorCopy)
          return valid;

    }

 

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
            <form onSubmit={saveOrUpdateCourse}>
                <div className="form__group">
                    <label className="form__label">Course Name</label>
                    <input className="form__input" type="text" value={courseName} onChange={(e)=>setCourseName(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form__label">Description</label>
                    <input className="form__input" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                
                <div className="form__group">
                    <label className="form__label">Duration</label>
                    <input className="form__input" type="text" value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Fees</label>
                    <input className="form__input" type="text" value={fee} onChange={(e)=>setFee(e.target.value)}/>
                </div>

                <div className="form__group">
                    <label className="form__label">Teacher Name</label>
                    <select className="form__input" type="text" value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}
                    >

                    <option value="">Select Teacher</option>
                    {teachers.map((teacher)=> (
                        <option key={teacher.teacherId} value={teacher.teacherId}>{teacher.tname}</option>
                    ))}
                    
                    </select>
                    
                    
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