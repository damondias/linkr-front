import React, { useEffect, useState } from "react";
// import useAuth from '../../Hooks/useAuth';
import Metadata from "./Metadata/metadataComponent";
import { MetadataContainer, PostBody, TextContainer, UserContainer, UserMessage, UserName, UserPicture } from "./postStyles";
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

export default function Post({ url, postId, title, description, image, message, name, profilePic, userId }) {

    const { user } = useAuth();
    const [ likes, setLikes ] = useState(0);
    const [ text, setText ] = useState('');
    const [userLiked, setUserLiked] = useState([]);
    const [isDeleting, setDeleting] = useState(false);
  
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
            if(resposta.data.user !== null){
                setUserLiked([...userLiked, resposta.data.user])
            }
        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })
    }         

    useEffect(getLikes, [user.postId, postId, url, user])

    function like(p){
        const promise = axios.post(`${process.env.REACT_APP_API_URI}/like`, data , config)
        promise.then(resposta => {
            console.log(resposta.data)
        })
        promise.catch((erro) => {
            console.log(erro.response.data)
        })

        getLikes();
    }

    return (
        <PostBody>
            <UserContainer>
                {isDeleting && <DeletePost isDeleting={isDeleting} setDeleting={setDeleting} postId={postId} />}
                <UserPicture>
                    <img src={profilePic ? profilePic : default_profile_pic} />
                </UserPicture>
                <SCContainerLikes>
                    {userLiked.includes(postId) ? <SCLike onClick={() => like(postId)}/> : <SCDislike onClick={() => like(postId)}/>}
                    <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                    ><SCQntdLikes>{likes}</SCQntdLikes></a>
                    <SCTooltip id='my-tooltip' style={{ backgroundColor: "#ffffff" }}>
                        <SCTooltipText>
                            {text}
                        </SCTooltipText>
                    </SCTooltip>
                </SCContainerLikes>
            </UserContainer>
            <TextContainer>
                <UserName to={`/user/${userId}`} className="username-post">{name}</UserName>
                <UserMessage>
                    <Tagify onClick={(text, type)=> {if(type=="tag") nav(`/hashtag/${text}`)}}>
                      {message}  
                    </Tagify>
                </UserMessage>
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
            <SCEdit userPost={userId === user.userId} />
        </PostBody>
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

const SCLike = styled(AiFillHeart)`
    width: 20px;
    height: 18px;
    color: #AC0000;
    cursor: pointer;
`

const SCDislike = styled(AiOutlineHeart)`
    width: 20px;
    height: 18px;
    color: #ffffff;
    cursor: pointer;
`

const SCQntdLikes = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    cursor: default;
`

const SCTooltip = styled(Tooltip)`
    box-shadow: 0px 4px 4px 0px #0000000D;
    width: 100%;
    height: 10px;
    border-radius: 3px;
    opacity: 0.9;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
`

const SCTooltipText = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 11px;
    font-weight: 700;
    line-height: 13px;
    color:#505050;
`

const SCDelete = styled(TbTrashFilled)`
    width: 20px;
    height: 18px;
    position: absolute;

    color: #ffffff;
    top: 15px;
    right: 15px;

    cursor: pointer;

    display: ${props => props.userPost ? 'block' : 'none'}
`

const SCEdit = styled(FaPencilAlt)`
    width: 20px;
    height: 18px;   
    position: absolute;

    color: #ffffff;
    top: 15px;
    right: 45px;

    cursor: pointer;
    display: ${props => props.userPost ? 'block' : 'none'} 
`