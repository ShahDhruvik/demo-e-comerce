import axios from 'axios';

const axiosInstance= axios.create({
    baseURL:"http://localhost:3000",
    timeout:"5000",
    timeoutErrorMessage:"Somthing went Wrong please try after sometime"
})
export default axiosInstance