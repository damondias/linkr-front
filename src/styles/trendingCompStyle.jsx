import { styled } from "styled-components";

export const TrendingBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 301px;
    background-color: #171717;
    border-radius: 16px;
    padding: 5px 0;
    color:white;

    margin-top: 120px;

    .title{
        font-size: 27px;
        color: white;
    }

    p{
        padding: 5px 20px;
        font-size: 19px;
        cursor: pointer;
    }

    hr{
        width: 100%;
    }
`;