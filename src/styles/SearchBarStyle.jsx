import { styled } from "styled-components";

export const SearchBarBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 13.5px;
    background-color: #333333;

    >form,input,div{
        z-index: 2;
    }
    @media (max-width:375px){
        margin-top: 85.5px;
        z-index: 0;
    }
    input{
        max-width: 100vw;
        width: 563px;
        height: 45px;
        padding: 0;
        border: 0;
        border-radius: 8px;
    }
    option{
        width:563px;
    }    
`;

export const OptionArea = styled.div`
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
`