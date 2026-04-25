import React,{ useEffect,useState} from 'react'
import axios from 'axios';
import Cap from '../assets/Icons/Cap';
import Book from '../assets/Icons/Book';
import Teacher from '../assets/Icons/Teacher';
import Enroll from '../assets/Icons/Enroll';
import { listEnrollment } from '../Services/EnrollmentService';


const Dashboard = (props) => {
  const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(0);
    const [enrollments,setEnrollments] = useState([]);


    

    const [stat,setStat] = useState({students:0,courses:0,teachers:0,enroll:0});


   
    const recentEnrollment = [...enrollments]
    .sort((a,b)=> new Date(b.enrollmentDate)- new Date(a.enrollmentDate))
    .slice(0,5);

   

    useEffect(() =>{
     
        axios.get("http://localhost:9090/dashboard/stats")
      .then((res)=>{
        setStat({
          students : res.data.students,
          courses: res.data.course,
          teachers: res.data.teacher,
          enroll: res.data.enrollmets

        });
        
    
      });
       
    listEnrollment()
    .then((res)=>setEnrollments(res.data))
    .catch((err)=> console.log(err))


    },[]);

    
  return (
 
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Welcome to the Student Management System. Monitor and  manage all your services from one place</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card" style={{background: "linear-gradient(135deg, #fa709a, #fee140)"}}>
          <div className="stat-card__left" >
            <div className="stat-card__label" >Total Students</div>
            <div className="stat-card__value" style={{ color: "#000000" }}>{stat.students}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EFF6FF" }}><Cap/></div>
        </div>
          
        <div className="stat-card" style={{background: "linear-gradient(135deg, #4facfe, #00f2fe)"}} >
          <div className="stat-card__left">
            <div className="stat-card__label">Active Courses</div>
            <div className="stat-card__value" style={{ color: "#000000" }}>{stat.courses}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#ECFDF5" }}><Book/></div>
        </div>

        <div className="stat-card" style={{background: "linear-gradient(135deg, #a18cd1, #fbc2eb)"}}>
          <div className="stat-card__left">
            <div className="stat-card__label">Teachers</div>
            <div className="stat-card__value" style={{ color: "#000000" }}>{stat.teachers}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#FFFBEB" }}><Teacher/></div>
        </div>

        <div className="stat-card" style={{background: "linear-gradient(135deg, #0a3b97, #197df0)"}}>
          <div className="stat-card__left">
            <div className="stat-card__label" style={{color:"white"}}>Enrollments</div>
            <div className="stat-card__value" style={{ color: "#ffffff" }}>{stat.enroll}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EDE9FE" }}><Enroll/></div>
        </div>
      </div>
      <div className="enrollment-card">
  <h2 className="enrollment-title">Recent Enrollments</h2>
  <div className="table-responsive"> {/* Wrapper for better mobile scrolling */}
    <table className="enrollment-table">
      <thead>
        <tr>
          <th>Enrollment Id</th>
          <th>Student Name</th>
          <th>Course Name</th>
          <th>Enrollment Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {recentEnrollment.map((enrollment) => (
          <tr key={enrollment.enrollmentId}>
            <td className="id-cell">#{enrollment.enrollmentId}</td>
            <td className="student-name">{enrollment.studentName}</td>
            <td>{enrollment.courseName}</td>
            <td>{enrollment.enrollmentDate}</td>
            <td>
              {/* Dynamic status classes */}
              <span className={`status-pill ${enrollment.status.toLowerCase()}`}>
                {enrollment.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          
    </div>
    
    
  )
}

export default Dashboard