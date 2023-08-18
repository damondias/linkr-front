import { styled } from "styled-components";

export const SearchBarBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 13.5px;

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
`