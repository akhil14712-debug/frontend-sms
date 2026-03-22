import React, {useState,useEffect} from 'react'
import { deleteTeacher,listTeacher } from '../../Services/TeacherService';
import { useNavigate } from 'react-router-dom';


const ListTeacher = () => {
    const navigate = useNavigate()
    const [teachers,setTeachers] = useState([]);
    useEffect(()=>{
        getAllTeacher();
    },[])

    function getAllTeacher(){
        listTeacher().then((res)=>{
            setTeachers(res.data);
        }).catch(error =>{
            console.log(error);
        }); 
    }

    function updateTeacher(id){
        navigate(`/update-teacher/${id}`);
    }

    function removeTeacher(id){
        console.log(id);
        deleteTeacher(id).then((res) => {
            getAllTeacher();
        }).catch(err =>{
            console.error(err);
        })
    }

   
  
  return (
    <div>
    <button className="my-btn1" onClick={() => navigate('/teachers/add')}>+ Add Teacher</button>
    <div className="table-wrapper">
        <h2><center>List of Teacher</center></h2>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Teacher Id</th>
                    <th>Teacher Name</th>
                    <th>Teacher Email</th>
                    <th>Teacher Phone</th>
                    <th>Qualification</th>
                    <th>Action</th>
                   
                </tr>
            </thead>

            <tbody>
                {
                    teachers.map(teacher =>
                        <tr key={teacher.teacherId}>
                            <td>{teacher.teacherId}</td>
                            
                            <td>{teacher.tname}</td>
                            <td>{teacher.temail}</td>
                            <td>{teacher.tphone}</td>
                            <td>{teacher.qualification}</td>

                            <td>
                                <button className="btn btn-primary" onClick={() => updateTeacher(teacher.teacherId)}>✏️Update</button>
                                 <button className="btn btn-danger" onClick={() => removeTeacher(teacher.teacherId)}>🗑️Delete</button>
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

export default ListTeacher