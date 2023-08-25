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
import { PiPaperPlaneTilt } from 'react-icons/pi'
import Comment, { SCCommentComments, SCContainerCommentarios, SCInfosComments, SCNameComments, SCPictureComments, SCTitleComments, SCtextComments } from "../Comment";


export default function Post({ url, postId, title, description, image, message, name, profilePic, userId, repUserId, reposts}) {

    const { user } = useAuth();

    // Variáveis Like
    const [ likes, setLikes ] = useState(0);
    const [ text, setText ] = useState('');
    const [userLiked, setUserLiked] = useState(false)

    // Variáveis Comments
    const [comment, setComment] = useState('');
    const [countComments, setCountComments] = useState(0);
    const [dataComments, setDataComments] = useState([]);
    const [followingComments, setFollowingComments] = useState([]);

    //Variáveis Delete and Edit
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

    function getComments(){
        const promise = axios.get(`${process.env.REACT_APP_API_URI}/comments/${postId}`, config)
         promise.then(resposta => {
            setDataComments(resposta.data.comments)
            setCountComments(resposta.data.countComment)
            setFollowingComments(resposta.data.following)
        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })
    }

    useEffect(getComments, [user.postId, postId, url, user])

    const dataComment = {
        text: comment
    }

    function commentPost(){
        const promise = axios.post(`${process.env.REACT_APP_API_URI}/comment/${postId}`, dataComment, config)
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

    function visibleComments(){

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
                        <SCComments onClick={() => visibleComments()}/>
                        <SCQntdComments>{countComments} comments</SCQntdComments>
                </SCContainerComment>
                <RepostButton>
                    <SCShares />
                    {reposts==null?0 :reposts } re-posts
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
        <SCContainerComments visible={''}>
                    {dataComments.length === 0 ? '' :
                        (dataComments.map((c, i) => 
                            <SCContainerCommentarios key={i}>
                            <SCPictureComments src={c.image}/>
                            <SCtextComments>
                                <SCTitleComments>
                                    <SCNameComments>
                                        {c.name}
                                    </SCNameComments>
                                    <SCInfosComments>
                                        {c.userId === userId ? "• post's author" : ''}
                                    </SCInfosComments>
                                    <SCInfosComments>
                                        {followingComments.includes(c.userId) ? "• following" : ''}
                                    </SCInfosComments>
                                </SCTitleComments>
                                <SCCommentComments>
                                    {c.text}
                                </SCCommentComments>
                            </SCtextComments>
                        </SCContainerCommentarios>
                        ))}
                    <SCNewComment>
                        <SCPicture>
                            <img src={user.image ? user.image : default_profile_pic} />
                        </SCPicture>
                        <SCInput
                            type='text'
                            placeholder='write a comment...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <SCSend onClick={() => commentPost()}/>
                    </SCNewComment>
                </SCContainerComments>
                <SCBackground />
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
    z-index:2;
`

const SCBackground = styled.div`
    width: 100%;
    min-height: 265px;

    position: absolute;
    top: 0;
    left: 0;

    border-radius: 16px 16px 0px 0px;

    background-color: #1E1E1E;
    z-index:0;
`

const SCContainerComments = styled.div`
width: 100%;
background-color: #1E1E1E;
border-radius: 0px 0px 16px 16px;
border: none;

padding: 25px 25px 16px 25px;

box-sizing: border-box;

@media (max-width: 610px) {
width: 100%;
border-radius: 0;

padding: 15px 9px;

z-index: 4;
}
`

const SCNewComment = styled.div`
width: 100%;
height: 83px;

display: flex;
align-items: center;

border-radius: 0px 0px 16px 16px;

background-color: #1e1e1e;

position: relative;

z-index:2;
`

const SCPicture = styled.div`
& > * {
width: 30px;
height: 30px;

border-radius: 50%;

border: 1px solid white
}

@media (max-width: 610px) {
& > * {
width: 30px;
height: 30px;
}
}
`;

const SCInput = styled.input`
width: 100%;
height: 39px;
margin-left: 14px;

border-radius: 8px;

background-color: #252525;
border: none;

color: #575757;
font-style: italic;

outline: none;

padding-left: 15px;
`

const SCSend = styled(PiPaperPlaneTilt)`
width: 15px;
height: 15px;

color: #F3F3F3;

position: absolute;
z-index: 15;

top: 34px;
right: 15px;

cursor: pointer;
`
