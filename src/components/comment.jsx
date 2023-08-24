import { styled } from "styled-components"
import default_profile_pic from "../assets/blank-profile-picture.png";
import { PiPaperPlaneTilt } from 'react-icons/pi'
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Comment(){

    const [comment, setComment] = useState('')

    const { user } = useAuth();

    console.log(user)

    return(
        <SCContainer>
            <SCNewComment>
                <UserPicture>
                    <img src={user.image ? user.image : default_profile_pic} />
                </UserPicture>
                <SCInput 
                    type='text'
                    placeholder='write a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <SCSend />
            </SCNewComment>
        </SCContainer>
    )
}

const SCContainer = styled.div`
    width: 73%;
    background-color: #1E1E1E;
    border-radius: 16px;
    border: none;

    padding: 19px 25px 16px 25px;

    box-sizing: border-box;

    @media (max-width: 610px) {
        width: 100%;
        border-radius: 0;

        padding: 15px 9px;
    }
`

const SCNewComment = styled.div`
    width: 100%;
    height: 83px;

    display: flex;
    align-items: center;

    border-radius: 16px;

    background-color: #1e1e1e;

    position: relative;
`

const UserPicture = styled.div`
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
`