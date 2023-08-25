import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URI;


async function signUp(body) {
    const promise = await axios.post(`${BASE_URL}/cadastro`, body);
    return promise;
}


async function login(body) {
    const promise = axios.post(`${BASE_URL}/login`, body);
    return promise;
}



const apiAuth = { signUp, login} 
export default apiAuth