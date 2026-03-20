import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Dashboard = () => {
  const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(0);

    const [stat,setStat] = useState({students:0,courses:0});

    useEffect(() =>{
      Promise.all([
        axios.get("http://localhost:8080/api/students/count"),
        axios.get("http://localhost:8080/api/course/count")
      ])
      .then(([studentRes,courseRes])=>{
        setStat({
          students : studentRes.data,
          courses: courseRes.data
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
        <div className="stat-card">
          <div className="stat-card__left">
            <div className="stat-card__label">Total Students</div>
            <div className="stat-card__value" style={{ color: "#3B82F6" }}>{stat.students}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EFF6FF" }}>🎓</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__left">
            <div className="stat-card__label">Active Courses</div>
            <div className="stat-card__value" style={{ color: "#10B981" }}>{stat.courses}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#ECFDF5" }}>📚</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__left">
            <div className="stat-card__label">Teachers</div>
            <div className="stat-card__value" style={{ color: "#F59E0B" }}>{7}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#FFFBEB" }}>👨‍🏫</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__left">
            <div className="stat-card__label">Enrollments</div>
            <div className="stat-card__value" style={{ color: "#8B5CF6" }}>{1002}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EDE9FE" }}>📝</div>
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard