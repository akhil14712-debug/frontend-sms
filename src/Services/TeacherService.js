import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9090/api/teacher';

export const listTeacher = ()=> axios.get(REST_API_BASE_URL);

export const createTeacher = (teacher)=> axios.post(REST_API_BASE_URL,teacher);

export const getTeacher = (id) => axios.get(REST_API_BASE_URL +'/'+id);

export const updateTeacher = (id,teacher) => axios.put(REST_API_BASE_URL +'/'+id,teacher);

export const deleteTeacher = (id) => axios.delete(REST_API_BASE_URL +'/'+id);