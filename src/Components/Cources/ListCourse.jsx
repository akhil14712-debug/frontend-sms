import React, { useEffect, useState } from 'react'
import { deleteCourse, listCourse } from '../../Services/CourseSerive';
import { useNavigate } from 'react-router-dom';


const ListCourse = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCourse()
    }, [])

    function getAllCourse() {
        setLoading(true);
        setError(null);
        listCourse().then((res) => {
            setCourses(res.data);
        }).catch((err) => {
            console.log(err);
            setError("Failed to load courses. Please check if backend is running.");
        }).finally(() => {
            setLoading(false);
        });
    }

    function updateCourse(id) {
        navigate(`/update-course/${id}`)
    }

    function removeCourse(id) {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        deleteCourse(id).then((res) => {
            getAllCourse();
        }).catch(err => {
            console.error(err);
        });
    }

    // 🔄 Loading State
    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading courses...</p>
        </div>
    );

    // ❌ Error State
    if (error) return (
        <div className="error-container">
            <h3>⚠️ Something went wrong</h3>
            <p>{error}</p>
            <button onClick={getAllCourse}>Try Again</button>
        </div>
    );

    // 📭 Empty State
    if (courses.length === 0) return (
        <div className="empty-container">
            <p>📭 No courses found.</p>
            <button onClick={() => navigate('/courses/add')}>+ Add First Course</button>
        </div>
    );

    return (
        <div className="course-page">

            {/* Header */}
            <div className="course-header">
                <h3>📚 All Courses <span className="count-badge">{courses.length}</span></h3>
                <button className="btn-add" onClick={() => navigate('/courses/add')}>
                    + Add Course
                </button>
            </div>

            {/* Cards Grid */}
            <div className="course-grid">
                {courses.map(course => (
                    <div className="course-card" key={course.courseId}>

                        {/* Top gradient bar */}
                        {/* <div className="card-top-bar"></div> */}

                        {/* Card Body */}
                        <div className="card-body">
                            {/* <div className="card-icon">📚</div> */}
                            <h2 className="card-title">{course.courseName}</h2>
                            <p className="card-description">{course.description}</p>

                            <div className="card-info">
                                <div className="info-item">
                                    <span className="info-label">👨‍🏫 Instructor</span>
                                    <span className="info-value">{course.teacherName || "N/A"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">⏱️ Duration</span>
                                    <span className="info-value">{course.duration || "N/A"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">💰 Fees</span>
                                    <span className="info-value">₹{course.fee || "N/A"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">🆔 Course ID</span>
                                    <span className="info-value">#{course.courseId}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer - Actions */}
                        <div className="card-footer">
                            <button className="btn-edit" onClick={() => updateCourse(course.courseId)}>
                                ✏️ Update
                            </button>
                            <button className="btn-delete" onClick={() => removeCourse(course.courseId)}>
                                🗑️ Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCourse