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

const api = {
    createPost,

}

export default api;