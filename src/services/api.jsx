import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URI;

function createHeaders(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

async function createPost(body, token) {
    const auth = createHeaders(token);

    const promise = await axios.post(`${BASE_URL}/posts`, body, auth);

    return promise;
}

async function getPost(token) {
    const auth = createHeaders(token);

    const render_limit = 20;
    const promise = await axios.get(`${BASE_URL}/posts/${render_limit}`, auth);

    return promise;
}

const api = {
    createPost,
    getPost,
}

export default api;
// import axios from "axios";
// import { useNavigate } from "react-router-dom"




// export function useSignUp() {
//     const navigate = useNavigate()

//     return (body) => {
//         axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
//             .then(res => navigate("/"))
//             .catch(err => alert(err.response.data))
//     }
// }
