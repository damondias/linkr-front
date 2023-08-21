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

async function getHashtagPost(token,hashtag) {
    const auth = createHeaders(token);

    const promise = await axios.get(`${BASE_URL}/hashtag/${hashtag}`, auth);

    return promise;
}

async function getUsersPost(token,id) {
    const auth = createHeaders(token);

    const promise = await axios.get(`${BASE_URL}/user/${id}`, auth);

    return promise;
}

async function deletePost(postId, token) {
    const auth = createHeaders(token);
    console.log({token, postId})
    const promise = await axios.delete(`${BASE_URL}/post/delete/${postId}`, auth);

    return promise;
}

async function editPost(body, postid, token) {
    const auth = createHeaders(token);

    const promise = await axios.put(`${BASE_URL}/posts/update/${postid}`, body, auth);
    return promise;
}

const api = {
    createPost,
    getPost,
    getHashtagPost,
    getUsersPost,
    deletePost,
    editPost,
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
