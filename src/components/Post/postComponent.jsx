import React, { useState } from "react";
// import useAuth from '../../Hooks/useAuth';
import Metadata from "./Metadata/metadataComponent";
import { MetadataContainer, PostBody, TextContainer, UserContainer, UserMessage, UserName, UserPicture } from "./postStyles";
import default_profile_pic from "../../assets/blank-profile-picture.png"

export default function Post({ url, postId, title, description, image, message, name, profilePic, userId }) {

    return (
        <PostBody>
            <UserContainer>
                <UserPicture>
                    <img src={profilePic ? profilePic : default_profile_pic} />
                </UserPicture>
            </UserContainer>
            <TextContainer>
                <UserName to={`/user/${userId}`} className="username-post">{name}</UserName>
                <UserMessage>
                    {message}
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