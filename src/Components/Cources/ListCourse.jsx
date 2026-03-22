import React, { useEffect, useState } from 'react'
import { listCourse } from '../../Services/CourseSerive';
import { Navigate, useNavigate } from 'react-router-dom';
const ListCourse = () => {
    const [courses,setCourses] = useState([]);
    console.log(courses)
    const navigate = useNavigate();
    useEffect(()=>{
        getAllCourse()
    },[])

    function getAllCourse(){
        listCourse().then((res)=>{
            setCourses(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function updateCourse(courseId){
        navigate(`update-course/${courseId}`)
    }

   
  return (
    <div>
        <button className="my-btn1" onClick={()=>navigate('/courses/add')} >+ Add Course</button>
    <div className="table-wrapper">
        <h2><center>List of Course</center></h2>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Course Id</th>
                    <th>Course Name</th>
                    <th>Instructor Name</th>
                    <th>Duration</th>
                    <th>Fees</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                   courses.map(course=>
                    <tr key ={course.id}>
                        <td>{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.instructor}</td>
                        <td>{course.duration}</td>
                        <td>{course.fee}</td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>updateCourse(course.courseId)}>✏️Update</button>
                            <button className="btn btn-danger">🗑️Delete</button>
                        </td>
                    </tr>
                   ) 
                }
            </tbody>
        </table>

    </div>
    </div>
  )
}

export default ListCourse