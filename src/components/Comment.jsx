import { styled } from "styled-components"

const SCContainerCommentarios = styled.div`
    width: 100%;
    min-height: 71px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid #353535;
`

const SCPictureComments = styled.img`
    width: 39px;
    height: 39px;

    border-radius: 50%;
`

const SCtextComments = styled.div`
    height: 39px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: 18px;
`

const SCTitleComments = styled.div`
    display: flex;
`

const SCNameComments = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;

    margin-left: 4px;

    color: #F3F3F3;
`

const SCInfosComments = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    margin-left: 4px;

    color: #565656;
`

const SCCommentComments = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    margin-left: 4px;

    color: #ACACAC;
`

export {
    SCContainerCommentarios,
    SCPictureComments,
    SCtextComments,
    SCTitleComments,
    SCNameComments,
    SCInfosComments,
    SCCommentComments
}