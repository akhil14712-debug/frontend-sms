import React, {useState,useEffect} from 'react'
import { deleteStudent, getStudentSearch, listStudent } from '../../Services/StudentService';
import { useNavigate } from 'react-router-dom';


const ListStudent = () => {
    const navigate = useNavigate()

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const [students,setStudents] = useState([]);
    const [searchName,setSearchName] = useState("");
    useEffect(()=>{
        getAllStudent();
    },[])

    function getAllStudent(){
        setLoading(true)
        setError(null)
        listStudent().then((res)=>{
            setStudents(res.data);
        }).catch(error =>{
            console.log(error);
            setError("Failed t load the student . Please check if backend is running..");
        }).finally(() => {
            setLoading(false);
        })
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

    if(loading) return (
         <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading students...</p>
        </div>
    )

    if(error) return (
        <div className="error-container">
            <h3>⚠️ Something went wrong</h3>
            <p>{error}</p>
            <button onClick={getAllStudent}>Try Again</button>
        </div>
    )

    function searchStudent(){
        if(!searchName.trim()){
            getAllStudent()
            return
        }else{
            getStudentSearch(searchName)
            .then((res)=>setStudents(res.data))
            .catch(err=>console.log(err))
        }
    }

    function cancelSearch(){
        getAllStudent()
    }

   
  
  return (
    <div>
        <div className="search-container">
            <input type="text" placeholder="Search students by name"  className="search" value={searchName} onChange={(e)=>setSearchName(e.target.value)}></input>
            <button className="search-btn" onClick={searchStudent}>Search</button>
            <button className="cancel-btn" onClick={cancelSearch}>Cancel</button>
        </div>
    <div className='add-student-div'><button className="my-btn1" onClick={() => navigate('/students/add')}>+ Add Student</button></div>
    <div className="table-wrapper">
        <div className='lst-student'><center>List of Students</center></div>
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