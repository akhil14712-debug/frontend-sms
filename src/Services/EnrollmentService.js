import axios from "axios";

const REST_API = "http://localhost:9090/api/enrollment";

export const listEnrollment = () => axios.get(REST_API+'/all');

export const createEnrollment = (enrollment) => axios.post(REST_API,enrollment);



export const getEnrollment = (id) => axios.get(REST_API +'/'+id);

export const updateEnrollment = (id,enrollment) => axios.put(REST_API +'/'+id,enrollment);

export const deleteEnrollment = (id) => axios.delete(REST_API +'/'+id);

export const searchEnrollment = (name,course,status,pageNo,pageSize,sortBy,sortDir) => {
    return axios.get(REST_API,{
        params: {
            name,
            course,
            status,
            pageNo,
            pageSize,
            sortBy,
            sortDir
        }
    });
};
