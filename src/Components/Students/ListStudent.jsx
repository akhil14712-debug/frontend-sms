import React, {useState,useEffect} from 'react'
import { deleteStudent, listStudent } from '../../Services/StudentService';
import { useNavigate } from 'react-router-dom';


const ListStudent = () => {
    const navigate = useNavigate()
    const [students,setStudents] = useState([]);
    useEffect(()=>{
        getAllStudent();
    },[])

    function getAllStudent(){
        listStudent().then((res)=>{
            setStudents(res.data);
        }).catch(error =>{
            console.log(error);
        }); 
    }

    function updateStudent(id){
        navigate(`/update-student/${id}`);
    }

    function removeStudent(id){
        console.log(id);
        deleteStudent(id).then((res) => {
            getAllStudent();
        }).catch(err =>{
            console.error(err);
        })
    }

   
  
  return (
    <div>
    <button className="my-btn1" onClick={() => navigate('/students/add')}>+ Add Student</button>
    <div className="table-wrapper">
        <h2><center>List of Students</center></h2>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Id</th>
                    
                    <th>Student Name</th>
                    <th>Student Department</th>
                    <th>Student Email</th>
                    <th>Student Phone</th>
                    <th>Action</th>
                   
                </tr>
            </thead>

            <tbody>
                {
                    students.map(student =>
                        <tr key={student.sid}>
                            <td>{student.sid}</td>
                           
                            <td>{student.sname}</td>
                            <td>{student.department}</td>
                            <td>{student.semail}</td>
                            <td>{student.sphone}</td>
                            <td>
                                <button className="btn-up" onClick={() => updateStudent(student.sid)}>✏️Update</button>
                                 <button className="btn-dl" onClick={() => removeStudent(student.sid)}>🗑️Delete</button>
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

export default ListStudent