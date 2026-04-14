import React, {useState,useEffect} from 'react'
import { deleteTeacher,getTeacherSearch,listTeacher } from '../../Services/TeacherService';
import { useNavigate } from 'react-router-dom';


const ListTeacher = () => {
    const navigate = useNavigate()
    const [teachers,setTeachers] = useState([]);
    const[searchName,setSearchName] = useState("")

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

    function searchTeacher(){
        if(!searchName.trim()){
            getAllTeacher()
            return
        }else{
            getTeacherSearch(searchName)
            .then((res)=>setTeachers(res.data))
            .catch(err=>console.log(err));
        }
    }

   
  
  return (
    <div>
        <div className="search-container">
            <input type="text" placeholder='Search teacher by name'  className="search" value={searchName} onChange={(e)=>setSearchName(e.target.value)}></input>
            <button className="search-btn" onClick={searchTeacher}>Search</button>
        </div>
    <div className='add-student-div'><button className="my-btn1" onClick={() => navigate('/teachers/add')}>+ Add Teacher</button></div>
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
                                <button className="btn-up" onClick={() => updateTeacher(teacher.teacherId)}>✏️Update</button>
                                 <button className="btn-dl" onClick={() => removeTeacher(teacher.teacherId)}>🗑️Delete</button>
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