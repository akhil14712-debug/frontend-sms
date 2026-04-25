import React, {useState,useEffect} from 'react'
import { completeList, deleteStudent} from '../../Services/StudentService';
import { useNavigate } from 'react-router-dom';
import Search from '../../assets/Icons/Search';
import { useDebounce } from 'use-debounce';

const ListStudent = () => {

    const [name,setName] = useState("")
    const [department,setDepartment] = useState("")
    const [pageNo ,setPageNo] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [sortBy,setSortBy] = useState("")
    const [sortDir,setSortDir] = useState("asc")
    const [state,setState] = useState(true);

    const [pagination,setPagination] = useState({});

    const navigate = useNavigate()

    const [value] = useDebounce(name, 1000);

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const [students,setStudents] = useState([]);
  
    useEffect(()=>{
        getSearch()
    },[value,department,pageNo,pageSize,sortBy,sortDir])

 

    function updateStudent(id){
        navigate(`/update-student/${id}`);
    }

    function removeStudent(id){
        console.log(id);
        deleteStudent(id).then((res) => {
            getSearch()
        }).catch(err =>{
            console.error(err);
        })
    }

    

    
    function getSearch(){
       
        completeList(value,department,pageNo,pageSize,sortBy,sortDir)
        .then((res) => {
            setStudents(res.data.data);
            setPagination(res.data.pagination);
        })
        .catch((err)=>console.log(err));
        
    }

    console.log(pagination)
   

    function decrement()
    {
        if(pageNo > 1){
            setPageNo(pageNo-1)
        }
    }

    function handleName(){
        if(state){
            setSortBy("name"),
            setSortDir("asc")
            setState(!state)
        }else{
            setSortBy("name")
            setSortDir("desc")
            setState(!state)
        }
    }

    function handleDepart(){
        if(state){
            setSortBy("department")
            setSortDir("asc")
            setState(!state) 
        }else{
           setSortBy("department")
            setSortDir("desc")
            setState(!state) 
        }
    }

    

   
  
  return (
    <div>
        <div className="filter">
        <div className="search-container">
            <div className='search-outer'><input type="text" placeholder="Search students by name"  className="search" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <div className='close'><svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" ><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg></div></div>
        </div>
        
    </div>

        
    <div className='add-student-div'><button className="my-btn1" onClick={() => navigate('/students/add')}>+ Add Student</button></div>
    <div className="table-wrapper">
        <div className='lst-student'><center>List of Students</center></div>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Id</th>
                    
                    <th>Student Name<button className="arrow" onClick={handleName}>↑↓</button></th>
                    <th>Student Department <button  className="arrow" onClick={handleDepart}>↑↓</button></th>
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
        <div className='paggination'>
            <button className="prev-btn"  disabled={pagination.currentPage==0}
            onClick={decrement}>Prev</button>
            <div>
                {pagination.currentPage}
            </div>
             <button className="next-btn" disabled={pagination.isLast} onClick={() => setPageNo(pageNo+1)}>Next</button>
        </div>
    </div>
    </div>
    

  )
}

export default ListStudent