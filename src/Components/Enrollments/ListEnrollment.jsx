import React, {useState,useEffect} from 'react'
import { listEnrollment,deleteEnrollment,searchEnrollment } from '../../Services/EnrollmentService';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Search from '../../assets/Icons/Search';
import { useDebounce } from 'use-debounce';




const ListEnrollment = () => {

    const [searchName ,setSearchName] = useState("")
    const [searchCourse,setSearchCourse] = useState("")
    const [searchStatus,setSearchStatus] = useState("")
    const [pageNo , setPageNo] =  useState(0);
    const [pageSize , setPageSize] = useState(5);
    const [sortBy , setSortBy] = useState("name");
    const [sortDir , setSortDir] = useState("asc");
    const [pagination ,setPagination] = useState({});
    const [state,setState] = useState(true);
    

    const [value] = useDebounce(searchName, 1000);
    
    const navigate = useNavigate()
    const [enrollments,setEnrollments] = useState([]);
    useEffect(()=>{
        getEnrollments()
    },[value,searchCourse,searchStatus,pageNo,pageSize,sortBy,sortDir])

   function getEnrollments(){
    searchEnrollment(
        value,
        searchCourse,
        searchStatus,
        pageNo,
        pageSize,
        sortBy,
        sortDir
    )
    .then((res) => {
        setEnrollments(res.data.data);
        setPagination(res.data.pagination);
    })
    .catch(err => console.log(err));
}

    function updateEnrollment(id){
        navigate(`/update-enrollment/${id}`);
    }

    function removeEnrollment(id){
        console.log(id);
        deleteEnrollment(id).then((res) => {
            getSearch()
        }).catch(err =>{
            console.error(err);
        })
    }

    function decrement(){
        if(pageNo > 0){
            setPageNo(pageNo-1)
        }
    }

    function handleName(){
        if(state){
            setSortBy("name")
            setSortDir("asc")
            setState(false)
        }else{
            setSortBy("name")
            setSortDir("desc")
            setState(true)
        }
    }

     function handleCourse(){
        if(state){
            setSortBy("course")
            setSortDir("asc")
            setState(false)
        }else{
            setSortBy("course")
            setSortDir("desc")
            setState(true)
        }
    }

     function handleStatus(){
        if(state){
            setSortBy("status")
            setSortDir("asc")
            setState(false)
        }else{
            setSortBy("status")
            setSortDir("desc")
            setState(true)
        }
    }
     function handleDate(){
        if(state){
            setSortBy("enrollmentDate")
            setSortDir("asc")
            setState(false)
        }else{
            setSortBy("enrollmentDate")
            setSortDir("desc")
            setState(true)
        }
    }


  return (

    <div>
        <div className="filter">
            <div className="search-container">
            <div className='search-outer'><input type="text" placeholder="Search students by name"  className="search" value={searchName} onChange={(e)=>setSearchName(e.target.value)}></input>
            <div className='close'>{searchName.length>0 && <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" ><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>}</div></div>
           
        </div>
        {/* <div className="sort">
            <select placeholder="sort" value={sortBy} onChange={(e)=>setSortBy(e.target.value) }>
            <option value="name">Name</option>
            <option value="course">Course</option>
            <option value="status">Status</option>
         </select>

         <select value={sortDir} onChange={(e)=>setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option  value="desc">Desc</option>
         </select>
        </div> */}
         
        </div>
         
         
         
        <div className='add-student-div'>
    <button className="my-btn1" onClick={() => navigate('/enrollment/add')}>+ Add Enrollment</button></div>
    <div className="table-wrapper">
        <h2><center>List of Enrollments</center></h2>
        <table className="table table-striped table-bordered student-table">
            <thead>
                <tr>
                    <th>Enrollment Id</th>
                    <th>Student Name <button className="arrow" onClick={handleName}>↑↓</button></th>
                    <th>Course Name  <button className="arrow" onClick={handleCourse}>↑↓</button></th>
                    <th>Enrollment Date <button className="arrow" onClick={handleDate}>↑↓</button> </th>
                    <th>Status <button className="arrow" onClick={handleStatus}
                    >↑↓</button></th>
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
        <div className='paggination'>
            <button className="prev-btn" disabled={pagination.currentPage==0} onClick={decrement}>Prev</button>
            <div className='numberList'>
                {[...Array(pagination.totalPages).keys()].map((value)=>{
                    return(<div  onClick={()=>setPageNo(Number(value))} className='numbers' style={{backgroundColor:(Number(pagination.currentPage)==Number(value))?"#2563eb":"ghostwhite"}} key={value+1}>{value+1}</div>)
                })}
            </div>
            <button className="next-btn"  disabled={pagination.isLast} onClick={()=>setPageNo(pageNo+1)}>Next</button>
            
        </div>
        
       
    </div>
    
   </div>

   
    

  )
}

export default ListEnrollment