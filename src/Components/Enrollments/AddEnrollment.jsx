import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import { createStudent, listStudent, updateStudent } from '../../Services/StudentService'

import { getStudent } from '../../Services/StudentService'

import { toast } from 'react-toastify'
import { createEnrollment, getEnrollment, updateEnrollment } from '../../Services/EnrollmentService'
import { listCourse } from '../../Services/CourseSerive'

const AddEnrollment = () => {
   
  
  const [studentId, setStudentId] = useState("")
  const [courseId, setCourseId] = useState("")
  const [enrollmentDate, setEnrollmentDate] = useState("")
  const [status,setStatus] = useState("")

  const [students,setStudents] = useState([])
  const [courses ,setCourses] = useState([])

  const {id} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{
    listStudent().then((res)=>
        setStudents(res.data)

    )
    .catch(err=>console.log(err))
    console.log(students)

    listCourse().then((res)=> setCourses(res.data))
   
    .catch(err=>console.log(err))
      console.log(courses)
    if(id){
      getEnrollment(id).then((res)=>{

        console.log(res.data)
        
        setStudentId(res.data.studentId);
        setCourseId(res.data.courseId);
        setEnrollmentDate(res.data.enrollmentDate);
        setStatus(res.data.status);

      }).catch(err => {
        console.log(err)
      })
    }
  },[id])

  function saveOrUpdateEnrollment(e){
    e.preventDefault();

    if(validateForm()){
      const enrollment = {
    studentId: studentId,
    courseId: courseId,
    enrollmentDate: enrollmentDate,
    status: status
}
      console.log(enrollment)

      if(id){
        updateEnrollment(id,enrollment).then((res)=>{
          console.log(res.data);
          
          navigate('/enrollment');
           toast.success("Enrollment updated successfully! 🎉")
    setTimeout(() => {
        
    }, 6000)
        }).catch(err=>{
           toast.error("Something went wrong! ❌")
          console.log(err);
        })
      }else{
          createEnrollment(enrollment).then((res)=> {
            console.log(enrollment)
            navigate('/enrollment')  
            toast.success("Enrollment created successfully! 🎉")
    setTimeout(() => {
        
    }, 6000)
            console.log(res.data)
            
          }).catch(err=>{
              toast.error("Something went wrong! ❌")
            console.log(err)});
        }
    }
  }

  
function validateForm() {
    if (!studentId) {
        toast.error("Please select a student!")
        return false
    }
    if (!courseId) {
        toast.error("Please select a course!")
        return false
    }
    if (!enrollmentDate) {
        toast.error("Please select enrollment date!")
        return false
    }
    if (!status) {
        toast.error("Please select status!")
        return false
    }
    return true
}


  function pageTitle(){
    if(id){
      return <h2 className="form__title">Update Enrollment</h2>
    }else{
      return <h2 className="form__title">Add Enrollment</h2>
    }
  }


 

  return (
    <div className="form-container">

      

      <div className="form">
        {
          pageTitle()
        }
        <p className="form__subtitle">Fill in the details to add a new enrollment</p>

        <form onSubmit={saveOrUpdateEnrollment}>
          
                <div className="form__group">
                    <label className="form__label">Student</label>
                    <select className="form__input" type="text" value={studentId} onChange={(e)=>setStudentId(e.target.value)}
                    >

                    <option value="">Select Student</option>
                    {students.map((student)=> (
                        <option key={student.sid} value={student.sid}>{student.sname}</option>
                    ))}
                    
                    </select>
                    
                    
                </div>

           <div className="form__group">
                        <label className="form__label">Course</label>
                        <select
                            className="form__input"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.courseId} value={course.courseId}>
                                    {course.courseName}  {/* ✅ show name, send ID */}
                                </option>
                            ))}
                        </select>
                    </div>

         <div className="form__group">
                        <label className="form__label">Enrollment Date</label>
                        <input
                            className="form__input"
                            type="date"              
                            value={enrollmentDate}
                            onChange={(e) => setEnrollmentDate(e.target.value)}
                        />
                    </div>

           <div className="form__group">
                        <label className="form__label">Status</label>
                        <select
                            className="form__input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>

          <div className="form__actions">
            <button
              type="button"
              className="form__btn-cancel"
              onClick={() => navigate('/enrollment')}
            >
              Cancel
            </button>
            <button type="submit" className="form__btn-submit" >
              Save Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEnrollment