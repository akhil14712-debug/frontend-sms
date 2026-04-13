import React, {useState,useEffect} from 'react'
import { listEnrollment,deleteEnrollment } from '../../Services/EnrollmentService';
import { useNavigate } from 'react-router-dom';


const ListEnrollment = () => {
    const navigate = useNavigate()
    const [enrollments,setEnrollments] = useState([]);
    useEffect(()=>{
        getAllEnrollment();
    },[])

    function getAllEnrollment(){
        listEnrollment().then((res)=>{
            setEnrollments(res.data);
        }).catch(error =>{
            console.log(error);
        }); 
    }

    function updateEnrollment(id){
        navigate(`/update-enrollment/${id}`);
    }

    function removeEnrollment(id){
        console.log(id);
        deleteEnrollment(id).then((res) => {
            getAllEnrollment();
        }).catch(err =>{
            console.error(err);
        })
    }

   
  
  return (
    <div>
        <div className='add-student-div'>
    <button className="my-btn1" onClick={() => navigate('/enrollment/add')}>+ Add Enrollment</button></div>
    <div className="table-wrapper">
        <h2><center>List of Enrollments</center></h2>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Enrollment Id</th>
                    <th>Student Name</th>
                    <th>Course Name</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                    <th>Action</th>
                   
                </tr>
            </thead>

            <tbody>
                {
                    enrollments.map(enrollment =>
                        <tr key={enrollment.enrollmentId}>
                            <td>{enrollment.enrollmentId}</td>
                            <td>{enrollment.studentName}</td>
                            <td>{enrollment.courseName}</td>
                            <td>{enrollment.enrollmentDate}</td>
                            <td>{enrollment.status}</td>
                            <td>
                                <button className="btn-up" onClick={() => updateEnrollment(enrollment.enrollmentId)}>✏️Update</button>
                                 <button className="btn-dl" onClick={() => removeEnrollment(enrollment.enrollmentId)}>🗑️Delete</button>
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

export default ListEnrollment