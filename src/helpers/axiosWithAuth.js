import axios from "axios";

export const axiosWithAuth=()=>{
    const token = localStorage.getItem("token");
    if(token){
        const headers={
            authorization:token
        }
        const baseURL = "http://localhost:5000/api";
        
        return axios.create({headers,baseURL});
    }
};

//Task List:
//Build and export a function used to send in our authorization token