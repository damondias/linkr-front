import useAuth from "../hooks/useAuth";

import styled from "styled-components";
import React, { useState } from "react";
import apiAuth from "../services/apiAuth";
import { useNavigate, Link } from "react-router-dom";


export default function SingInPage(){


  const [form, setForm] = useState({email: "", password: ""});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function formulario(e){
      setForm({...form, [e.target.name]:e.target.value})
  }


    async function logando(e){
      e.preventDefault();

        try {
          const { data } = await apiAuth.login({ ...form });
          setUser(data);
          navigate('/timeline');
        } catch (error) {
          console.log(error);
          alert("Erro, tente novamente");
        }
    }

    return(
        <ContainerPage>
        <Left className="left-content">
            <Titulo>linkr</Titulo>
            <Subtitle>lsave, share and discover the best links on the web</Subtitle>
        </Left>
        <div className="right-content">
        <Form onSubmit={logando}>
            <StyledInput placeholder="E-mail" type="email" name="email" value={form.email} required onChange={(e) => formulario(e)} />
            <StyledInput placeholder="Password" type="password" name="password" value={form.password} required onChange={(e) => formulario(e)}/>
            <Button type="submit">Log In</Button>
            <StyledParagraph to="/sign-up">First time? Create an account!</StyledParagraph>
        </Form>
    </div>
    </ContainerPage>
       

    )
  }


const ContainerPage = styled.div`
  background-color: #151515;
  box-shadow: 4px 0px 4px 0px #00000040;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    padding: 0 20px;
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25);

    @media (max-width: 768px) {
  
  .right-content {
    width: 100%;
    order: 2;
    
  }
}

  }

  .right-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    padding: 0 20px;
    height: 100vh;
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: rgba(51, 51, 51, 1);

    @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    order: 1;
  }
;
  }
`;
const Titulo = styled.h1`
  font-family: 'Passion One';
  font-size: 106px;
  font-weight: 700;
  line-height: 117px;
  letter-spacing: 0.05em;
  text-align: left;
  width: 100%;
  height: 117px;
  top: 301px;
  left: 144px;
  color: #FFFFFF;
`;

const Left = styled.div`
    display: flex;
    justify-content: center;
`

const Subtitle = styled.h2`
  font-family: 'Oswald';
  font-size: 43px;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: left;
  width: 442px;
  height: 128px;
  top: 418px;
  left: 144px;
  color: #FFFFFF;
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

const StyledInput = styled.input`
  width: 429px;
  height: 65px;
  border-radius: 6px;
  color: #9F9F9F;
  font-family: Oswald;
font-size: 27px;
font-weight: 700;
line-height: 40px;
letter-spacing: 0em;
text-align: left;

`;

const Button = styled.button`
  width: 429px;
  height: 65px;
  top: 473px;
  left: 956px;
  border-radius: 6px;
  background-color: #1877F2;
  color: #FFFFFF;
  border: none;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;
  font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: center;


  &:hover {
    background-color: #0c59be;
    cursor: pointer;
  }
`;

const StyledParagraph = styled(Link)`
  font-family: Lato;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  width: 262px;
  height: 24px;
  top: 560px;
  left: 1044px;
  color: #FFFFFF;
  text-decoration: underline;
  display: flex;
  justify-content: center;

`;



