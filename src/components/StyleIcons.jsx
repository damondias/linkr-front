import styled from "styled-components";
import { FaPencilAlt } from 'react-icons/fa';
import { TbTrashFilled } from 'react-icons/tb';
import { AiOutlineComment } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { FaRetweet } from 'react-icons/fa'

const SCContainerLikes = styled.div`
    width: 60px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
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

const SCContainerComment = styled.div`
    width: 67px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
`

const SCComments = styled(AiOutlineComment)`
     width: 20px;
    height: 18px;
    color: #ffffff;
    cursor: pointer;
`

const SCQntdComments = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    cursor: default;
`

const SCContainerShares = styled.div`
    width: 67px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
`

const SCShares = styled(FaRetweet)`
     width: 20px;
    height: 18px;
    color: #ffffff;
    cursor: pointer;
`

const SCQntdShares = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #ffffff;
    cursor: default;
`

const SCDelete = styled(TbTrashFilled)`
    width: 20px;
    height: 18px;
    position: absolute;

    color: #ffffff;
    top: 8px;
    right: 15px;

    cursor: pointer;

    display: ${props => props.userPost ? 'block' : 'none'}
`

const SCEdit = styled(FaPencilAlt)`
    width: 20px;
    height: 18px;   
    position: absolute;

    color: #ffffff;
    top: 8px;
    right: 45px;

    cursor: pointer;
    display: ${props => props.userPost ? 'block' : 'none'} 
`

export {
    SCContainerLikes,
    SCLike,
    SCDislike,
    SCQntdLikes,
    SCTooltip,
    SCTooltipText,
    SCContainerComment,
    SCComments,
    SCQntdComments,
    SCContainerShares,
    SCShares,
    SCQntdShares,
    SCDelete,
    SCEdit
}