import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Dashboard = (props) => {
  const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(0);

    
    useEffect(()=>{
        axios.get("http://localhost:8080/api/students/count")
        .then((response)=> {
            setCount(response.data)
            setLoading(false);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[])
    console.log(count);
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
            <div className="stat-card__value" style={{ color: "#3B82F6" }}>{count}</div>
          </div>
          <div className="stat-card__icon" style={{ background: "#EFF6FF" }}>🎓</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__left">
            <div className="stat-card__label">Active Courses</div>
            <div className="stat-card__value" style={{ color: "#10B981" }}>{11}</div>
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