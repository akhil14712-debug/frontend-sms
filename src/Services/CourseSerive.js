import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/course";

export const listCourse = () => axios.get(REST_API_BASE_URL);

export const createCourse = (course) => axios.post(REST_API_BASE_URL,course)