import { FaMagnifyingGlass } from "react-icons/fa6";
import { styled } from "styled-components";

export const SearchBarBody = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    margin-top: 13.5px;
    background-color: #333333;

    z-index: 15;

    @media (min-width: 376px) {
        position: fixed;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
        z-index: 3;
        background-color: transparent;
    }

    @media (max-width:375px){
        margin-top: 85.5px;
        z-index: 0;
    }
    input{
        box-sizing: border-box;
        max-width: 100vw;
        width: 563px;
        height: 45px;
        padding: 0 20px;
        border: 0;
        border-radius: 8px;

        z-index: 15;
    }
    option{
        width:563px;
    }
    input:focus + div{
        display: block;
    }
    input:not(:focus) + div:not(:hover){
        display: none;
    }
`;

export const OptionArea = styled.div`
    position: absolute;
    max-width: 100vw;
    width: 563px;
    border-radius: 0 0 8px 8px;
    background-color: #E7E7E7;

    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin: 5px 10px;
    }

    >div{
        display: flex;
        align-items: center;
    }

    p{
        display: inline;
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: left;
        color: #C5C5C5;
        padding-left: 10px;
    }
`

export const Icon = styled(FaMagnifyingGlass)`
    position: absolute;
    margin: 8.5px -40px;
    width: 28px;
    height: 28px;
`