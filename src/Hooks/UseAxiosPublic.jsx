import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://ems-server-gray.vercel.app/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;