import React, { useState } from 'react';
import { Post, PostForm, PostUserInfo, PostUrl, PostDescription, ButtonPublish } from './publishStyles.jsx';
import api from '../../services/api.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth.jsx';

export default function Publish({ fetchPosts, userToken }) {

    const { user } = useAuth();
    const [formData, setFormData] = useState({ url: '', userMessage: '' });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
        await api.createPost(formData, user?.token);
        setLoading(false);
        setFormData({});
        fetchPosts(userToken);
        }
        catch (error) {
        Swal.fire({
            icon: 'error',
            title: "Couldn't publish the post",
            text: "An error occured while publishing the post. Please, try again.",
        });
        setLoading(false);
        }
    }

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

  return (
    <Post>
      <PostUserInfo>
        <Link to={`/user/${user?.userId}`}>
          <img src={user?.image} alt="avatar" />
        </Link>
      </PostUserInfo>
      <PostForm onSubmit={handleSubmit} >
        <h2>What are you going to share today?</h2>
        <PostUrl
          name="url"
          placeholder="http://..."
          type="url"
          value={formData.url}
          onChange={handleInputChange}
          required
        />
        <PostDescription
          name="userMessage"
          placeholder="Awesome article about #javascript"
          type="text"
          value={formData.userMessage}
          onChange={handleInputChange}
        />
        <ButtonPublish disabled={loading}>
          {loading ? 'Loading...' : 'Publish'}
        </ButtonPublish>
      </PostForm>
    </Post>
  );
}