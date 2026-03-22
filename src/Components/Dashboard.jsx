import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Dashboard = () => {
  const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(0);

    const [stat,setStat] = useState({students:0,courses:0,teachers:0});

    useEffect(() =>{
      Promise.all([
        axios.get("http://localhost:8080/api/students/count"),
        axios.get("http://localhost:8080/api/course/count"),
        axios.get("http://localhost:8080/api/teacher/count")
      ])
      .then(([studentRes,courseRes,teacherRes])=>{
        setStat({
          students : studentRes.data,
          courses: courseRes.data,
          teachers:teacherRes.data
        });
      });
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
          <div className="stat-card__icon" style={{ background: "#EFF6FF" }}>🎓</div>
        </div>
          
        <div className="stat-card" style={{background: "linear-gradient(135deg, #4facfe, #00f2fe)"}} >
          <div className="stat-card__left">
            <div className="stat-card__label">Active Courses</div>
            <div className="stat-card__value" style={{ color: "#000000" }}>{stat.courses}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#ECFDF5" }}>📚</div>
        </div>

        <div className="stat-card" style={{background: "linear-gradient(135deg, #a18cd1, #fbc2eb)"}}>
          <div className="stat-card__left">
            <div className="stat-card__label">Teachers</div>
            <div className="stat-card__value" style={{ color: "#000000" }}>{stat.teachers}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#FFFBEB" }}>👨‍🏫</div>
        </div>

        <div className="stat-card" style={{background: "linear-gradient(135deg, #0a3b97, #197df0)"}}>
          <div className="stat-card__left">
            <div className="stat-card__label" style={{color:"white"}}>Enrollments</div>
            <div className="stat-card__value" style={{ color: "#ffffff" }}>{3}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EDE9FE" }}>📝</div>
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard