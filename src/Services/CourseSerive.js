import axios from "axios";

const REST_API_BASE_URL = "http://localhost:9090/api/course";

export const listCourse = () => axios.get(REST_API_BASE_URL);
export const createCourse = (course) => axios.post(REST_API_BASE_URL,course)
export const getCourse = (id) => axios.get(REST_API_BASE_URL +'/'+id);
export const updateCourse = (id,course) => axios.put(REST_API_BASE_URL +'/'+id,course);
export const deleteCourse = (id) => axios.delete(REST_API_BASE_URL +'/'+id);