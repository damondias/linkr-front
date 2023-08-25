import { styled } from "styled-components"

export default function Comment({ following, name }){

    console.log(following)
    console.log(name)

    return (
            <SCContainer>
            <SCPicture/>
            <SCtext>
                <SCTitle>
                    <SCName>
                        
                    </SCName>
                    <SCInfos>
                        • following
                    </SCInfos>
                </SCTitle>
                <SCComment>
                    
                </SCComment>
            </SCtext>
        </SCContainer>
    )
}

const SCContainer = styled.div`
    width: 100%;
    min-height: 71px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid #353535;
`

const SCPicture = styled.img`
    width: 39px;
    height: 39px;

    border-radius: 50%;
`

const SCtext = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: 18px;
`

const SCTitle = styled.div`
    display: flex;
`

const SCName = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;

    margin-left: 4px;

    color: #F3F3F3;
`

const SCInfos = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    margin-left: 4px;

    color: #565656;
`

const SCComment = styled.p`
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    margin-left: 4px;

    color: #ACACAC;
`