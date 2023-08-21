import axios from "axios";
import { useNavigate } from "react-router-dom"

const BASE_URL = process.env.REACT_APP_API_URI;


async function useSignUp() {
    const navigate = useNavigate()

    return (body) => {
        axios.post(`${BASE_URL}/cadastro`, body)
            .then(res => navigate("/"))
            .catch(err => alert(err.response.data))
    }
}


async function login(body) {
    const promise = axios.post(`${BASE_URL}/login`, body);
    return promise;
}



const apiAuth = {useSignUp, login} 
export default apiAuth