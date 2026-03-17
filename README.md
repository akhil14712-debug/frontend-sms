# 🎓 Student Management System — Frontend

**A modern React frontend for managing students, courses, teachers, and enrollments.**

---

## 📌 Overview

The Student Management System (SMS) frontend is a React application that provides a clean dashboard interface to manage students, courses, teachers, and enrollments. It communicates with the Spring Boot backend via REST APIs.

---

## ✨ Features

- 🏠 Dashboard — Overview with total counts of students, courses, teachers, enrollments
- 🎓 Student Management — Add, view, update, delete students
- 📚 Course Management — Add, view, update, delete courses
- 👨‍🏫 Teacher Management — Manage teacher profiles
- 📋 Enrollment Tracking — Track student enrollments
- 🔀 React Router — Smooth navigation between pages
- 📡 Axios — REST API communication with backend

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Build Tool | Vite |
| Styling | CSS |
| Port | 5175 |

---

## 📁 Project Structure
```
frontend-sms/
├── src/
│   ├── Components/
│   │   ├── Students/
│   │   │   ├── AddStudent.jsx
│   │   │   ├── ListStudent.jsx
│   │   │   └── StudentCount.jsx
│   │   ├── Courses/
│   │   ├── Sidebar.jsx
│   │   └── Dashboard.jsx
│   ├── Services/
│   │   └── StudentService.js
│   ├── Style/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

---

## 🌐 Pages and Routes

| Route | Component | Description |
|---|---|---|
| / | Dashboard | Main dashboard with stats |
| /students | ListStudent | View all students |
| /students/add | AddStudent | Add new student |
| /courses | Courses | View all courses |
| /teachers | Teachers | View all teachers |
| /enrollment | Enrollment | View all enrollments |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend running on port 8080

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/akhil14712-debug/frontend-sms.git
cd frontend-sms
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Application
```bash
npm run dev
```

### 4️⃣ Open in Browser
```
http://localhost:5175
```

---

## 🔗 Backend Connection

Make sure your Spring Boot backend is running on:
```
http://localhost:8080
```

API base URL used in the project:
```javascript
axios.get("http://localhost:8080/api/students/count")
```

---

## ⚠️ Common Issues and Fixes

| Issue | Fix |
|---|---|
| CORS error | Enable @CrossOrigin on Spring Boot controllers |
| Backend not found | Make sure backend is running on port 8080 |
| Blank page | Check browser console for errors |
| npm install fails | Delete node_modules and run npm install again |

---

## 👨‍💻 Author

**Akhil**
GitHub: https://github.com/akhil14712-debug

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by Akhil | Student Management System
```
