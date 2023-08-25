import { styled } from "styled-components"

export default function Comment({ profilePic }){
    return (
        <SCContainer>
            <SCPicture src={profilePic}/>
            <SCtext>
                <SCTitle>
                    <SCName>
                        João Avatares
                    </SCName>
                    <SCInfos>
                        • following
                    </SCInfos>
                </SCTitle>
                <SCComment>
                    Adorei esse post, ajuda muito a usar Material UI com React!
                </SCComment>
            </SCtext>
        </SCContainer>
    )
}

const SCContainer = styled.div`
    width: 100%;
    min-height: 71px;

    background-color: white;

    display: flex;
    align-items: center;
`

const SCPicture = styled.img`
    width: 39px;
    height: 39px;

    border-radius: 50%;
`

const SCtext = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: blue;

    margin-left: 18px;
`

const SCTitle = styled.div`
    display: flex;
`

const SCName = styled.p`
    
`

const SCInfos = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: left;

    margin-left: 4px;

    color: #565656;


`

const SCComment = styled.p`
    
`