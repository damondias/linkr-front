import styled from "styled-components";

export const NavBarBody = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100vw;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #151515;
    padding: 0 20px;
    box-sizing: border-box;

    p{
        color: white;
        font-family: 'Passion One';
        font-weight: 700;
        font-size: 49px;
    }
`;

export const NavBarUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    ion-icon{
        color: white;
        width: 30px;
        height: 30px;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
`;

export const NavBarOptions = styled.div`
    position: fixed;
    top: 72px;
    height: 47px;
    width: 150px;
    padding-left: 20px;
    border-bottom-left-radius: 20px;
    display: ${props=>props.$hidden?"none":"flex"};
    align-items: center;
    background-color: #151515;

    p{
        font-family: 'Lato';
        font-size: 17px;
    }
`;