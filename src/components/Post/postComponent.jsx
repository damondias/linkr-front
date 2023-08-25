import React, { useEffect, useRef, useState } from "react";
// import useAuth from '../../Hooks/useAuth';
import Metadata from "./Metadata/metadataComponent";
import { PostDiv, MetadataContainer, PostBody, RepostTitle, TextContainer, UserContainer, UserMessage, UserName, UserPicture, RepostButton } from "./postStyles";
import default_profile_pic from "../../assets/blank-profile-picture.png";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'
import { Tagify } from 'react-tagify'
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaPencilAlt } from 'react-icons/fa';
import { TbTrashFilled } from 'react-icons/tb'
import DeletePost from "./Delete/DeleteComponent";
import api from "../../services/api";
import { SCDelete, SCEdit, SCLike } from "../StyleIcons.jsx";
import { SCDislike } from "../StyleIcons.jsx";
import { SCQntdLikes } from "../StyleIcons.jsx";
import { SCTooltip } from "../StyleIcons.jsx";
import { SCTooltipText } from "../StyleIcons.jsx";
import { SCContainerComment } from "../StyleIcons.jsx";
import { SCComments } from "../StyleIcons.jsx";
import { SCQntdComments } from "../StyleIcons.jsx";
import { SCShares } from "../StyleIcons.jsx";

export default function Post({ url, postId, title, description, image, message, name, profilePic, userId, repUserId, reposts}) {

    const { user } = useAuth();
    const [ likes, setLikes ] = useState(0);
    const [ text, setText ] = useState('');
    const [userLiked, setUserLiked] = useState(false)

    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [textToEdit, setTextToEdit] = useState(message);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing,isDeleting]);
            
    const nav = useNavigate()

    const token = user.token;

    const data = {
        userId: user.userId,
        postId
    }

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };

    function getLikes(){
        const promise = axios.get(`${process.env.REACT_APP_API_URI}/likes/${postId}`, config)
         promise.then(resposta => {
            setLikes(resposta.data.count);
            setText(resposta.data.text)
            if(resposta.data.userLiked){
                setUserLiked(true)
            }
        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })
    }         

    useEffect(getLikes, [user.postId, postId, url, user])

    function like(){
        const promise = axios.post(`${process.env.REACT_APP_API_URI}/like`, data , config)
        promise.then(resposta => {
            console.log(resposta.data)
        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })

        getLikes();
    }

    function toggleEdit() {
        setTextToEdit(message);
        setIsEditing(!isEditing);
    }

    function editPost(e) {
        e.preventDefault();
        const body = {
            url: url,
            userMessage: textToEdit
        };

        api.editPost(body, postId, user.token)
            .then(() => {
                setIsEditing(!isEditing);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                alert("Erro na tentativa de edição")
            });
    }

    function verifyEsc(e) {
        if (e.key === 'Escape')
            toggleEdit();
    }

    return (
        <PostDiv>
            {
                repUserId!=null?<RepostTitle>reposted by {repUserId===user.userId?"you":name}</RepostTitle>:""
            }
        <PostBody>
            <UserContainer>
                {isDeleting && <DeletePost isDeleting={isDeleting} setDeleting={setDeleting} postId={postId} />}
                <UserPicture>
                    <img src={profilePic ? profilePic : default_profile_pic} />
                </UserPicture>
                <SCContainerLikes>
                    {userLiked === true ? <SCLike onClick={() => like()}/> : <SCDislike onClick={() => like()}/>}
                    <a
                        data-tooltip-id={String(postId)}
                        data-tooltip-place="bottom"
                    ><SCQntdLikes>{likes} likes</SCQntdLikes></a>
                    <SCTooltip id={String(postId)} style={{ backgroundColor: "#ffffff" }}>
                        <SCTooltipText>
                            {text}
                        </SCTooltipText>
                    </SCTooltip>
                </SCContainerLikes>
                <SCContainerComment>
                        <SCComments />
                        <SCQntdComments>11 comments</SCQntdComments>
                </SCContainerComment>
                <RepostButton>
                    <SCShares />
                    {reposts==null?0:reposts} re-posts
                </RepostButton>
            </UserContainer>
            <TextContainer>
                <UserName to={`/user/${userId}`} className="username-post">{name}</UserName>
                <UserMessage editing={isEditing}>
                    <Tagify onClick={(text, type)=> {if(type=="tag") nav(`/hashtag/${text}`)}} color="#ffffff">
                      {message}  
                    </Tagify>
                </UserMessage>
                <span>{
                    isEditing &&
                        (
                            <form onSubmit={editPost} onKeyDown={verifyEsc}>
                                <input
                                    ref={inputRef}
                                    value={textToEdit}
                                    onChange={e => setTextToEdit(e.target.value)}
                                    className='edit-input'
                                >
                                </input>
                            </form>
                        )
                    }
                </span>
 
                <MetadataContainer>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <Metadata
                            url={url}
                            postId={postId}
                            title={title}
                            description={description}
                            image={image}
                        />
                    </a>
                </MetadataContainer>
            </TextContainer>
            <SCDelete userPost={userId === user.userId} onClick={() => setDeleting(true)}/>
            <SCEdit userPost={userId === user.userId} onClick={toggleEdit}/>
        </PostBody>
        </PostDiv>
    );
}

const SCContainerLikes = styled.div`
    width: 60px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    margin-top: 10px;
`