import { styled } from "styled-components"
import useAuth from "../hooks/useAuth"
import axios from "axios";

export default function ConfirmRepost(props){

    const {user} = useAuth()
    const token = user.token;
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };

    function Yes(){
        axios.post(`${process.env.REACT_APP_API_URI}/repost/${props.postId}`,config)
        .then(()=>props.function(false))
        .catch(err=>console.log(err.data))
    }

    return(
        <Body>
            <QuestionBox>
                <p>Do you want to re-post this link?</p>
                <div>
                    <NoButton onClick={()=>props.function(false)}>
                        No, cancel
                    </NoButton>
                    <YesButton onClick={()=>Yes()}>
                        Yes, share!
                    </YesButton>
                </div>
            </QuestionBox>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 50;
    background-color: rgba(255,255,255,0.9);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const QuestionBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333333;
    color:white;
    width: 597px;
    height: 210px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    font-family: Lato;
    font-size: 29px;
    font-weight: 700;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;

    
    div{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }

    button{
        width: 134px;
        height: 37px;
        font-family: Lato;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0em;
        text-align: center;
    }
`
const NoButton = styled.button`
    color:#1877F2;
    background-color: #ffffff;
`
const YesButton = styled.button`
    color: #ffffff;
    background-color: #1877F2;
`