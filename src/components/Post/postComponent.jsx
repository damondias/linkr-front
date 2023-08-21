import React, { useState } from "react";
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

export default function Post({ url, postId, title, description, image, message, name, profilePic, userId }) {

    const nav = useNavigate()
    const liked = 1;

    function like(p){

    }

    return (
        <PostBody>
            <UserContainer>
                <UserPicture>
                    <img src={profilePic ? profilePic : default_profile_pic} />
                </UserPicture>
                <SCContainerLikes>
                    {liked === 1 ? <SCLike onClick={() => like(postId)}/> : <SCDislike onClick={() => like(postId)}/>}
                    <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-place="bottom"
                    ><SCQntdLikes>13 likes</SCQntdLikes></a>
                    <SCTooltip id='my-tooltip' style={{ backgroundColor: "#ffffff" }}>
                        <SCTooltipText>
                            {like === 1 ? 'Você, Julia e outras 11 pessoas' : 'Pedro, Julia e mais 11 pessoas'}
                        </SCTooltipText>
                    </SCTooltip>
                </SCContainerLikes>
            </UserContainer>
            <TextContainer>
                <UserName to={`/user/${userId}`} className="username-post">{name}</UserName>
                <UserMessage>
                    <Tagify onClick={(text, type)=> {if(type=="tag") nav(`/hashtag/${text}`)}} color="#ffffff">
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