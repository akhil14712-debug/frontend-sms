import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  {
    section: "MAIN", items: [
      { name: "Dashboard", icon: "🏠", path: "/" },
    ]
  },
  {
    section: "ACADEMIC", items: [
      { name: "Student",    icon: "🎓", path: "/students" },
      { name: "Course",     icon: "📚", path: "/courses" },
      { name: "Enrollment", icon: "📝", path: "/enrollment" },
      { name: "Teachers",   icon: "👨‍🏫", path: "/teachers" },
    ]
  }
]

const Sidebar = () => {
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-name">SMS🎓</div>
        <div className="sidebar__brand-sub">Student Management System</div>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="sidebar__section-label">{group.section}</div>
            {group.items.map((item) => {
              const isActive  = location.pathname === item.path
              const isHovered = hovered === item.name && !isActive
              return (
                <div
                  key={item.name}
                  className={`sidebar__item
                    ${isActive  ? "sidebar__item--active"  : ""}
                    ${isHovered ? "sidebar__item--hovered" : ""}`}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className={`sidebar__icon
                    ${isActive || isHovered ? "sidebar__icon--scaled" : ""}`}>
                    {item.icon}
                  </span>
                  <span className="sidebar__label">{item.name}</span>
                  {isActive && <span className="sidebar__dot" />}
                </div>
              )
            })}
            <div className="sidebar__divider" />
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar