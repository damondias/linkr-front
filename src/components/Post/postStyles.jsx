import styled from "styled-components";
import { Link } from 'react-router-dom';

const PostBody = styled.div`
    width: 100%;

    display: flex;

    padding: 18px 17px;
    border-radius: 16px;
    box-sizing: border-box;

    background-color: #171717;
    font-family: "Lato", sans-serif;

    position: relative;

    z-index:3;

    @media (max-width: 610px) {
        width: 100%;
        border-radius: 0;

        padding: 15px 9px;
    }
`;

const UserContainer = styled.div`
        width: 87px;
        display: flex;
        flex-direction: column;
        align-items: center;

        color: #FFF;

        margin-left: -15px;

        @media (max-width: 610px) {
            width: 70px;
        }
`;

const UserPicture = styled.div`
    & > * {
        width: 50px;
        height: 50px;

        border-radius: 50%;

        border: 1px solid white
    }

    @media (max-width: 610px) {
        & > * {
            width: 40px;
            height: 40px;
        }
    }
`;

const TextContainer = styled.div`
    width: calc(100% - 72px);
    
    display: flex;
    flex-direction: column;
`;

const UserName = styled(Link)`
    max-width: 455px;
    
    font-size: 19px;
    font-weight: 400;
    line-height: 20.4px;
    color: #FFF;
    
    padding-bottom: 8px;
    word-break: break-word;
    
    text-decoration: none;

    &hover {
        cursor: pointer;
        filter: brightness(5);
        text-decoration: underline;
    }

    @media (max-width: 610px) {
        font-size: 17px;
        max-width: 57vw;

        padding-bottom: 4px;
    }
`;

const UserMessage = styled.div`
    font-size: 17px;
    font-weight: 400;
    line-height: 20.7px;
    color: #B7B7B7;

    display: ${(props) => props.editing === true ? 'none': 'inline'};
    padding-bottom: 8px;

    span {
        font-size: 15px;
        font-weight: 700;
        line-height: 20.4px;
        color: #FFF;

        gap: 5px;
    }

    @media (max-width: 610px) {
        font-size: 15px;
        line-height: 18px;

        padding-bottom: 4px;
    }
`;

const MetadataContainer = styled.div` 
    a {
        all: unset;
    }
`;

const RepostTitle = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 40px;
    padding-left: 10px;
    border-radius: 16px 16px 0 0;
    background-color: #1e1e1e;
`

const RepostButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 19px;
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: center;
    ion-icon{
        width: 20px;
        height: 20px;
    }
`

const PostDiv = styled.div`
    position: relative;
    width: 75%;
    margin-top: 20px;

    @media (max-width: 610px) {
        width: 100%;
    }
`

export {
    PostDiv,
    PostBody,
    UserContainer,
    UserPicture,
    TextContainer,
    UserName,
    UserMessage,
    MetadataContainer,
    RepostTitle,
    RepostButton
}