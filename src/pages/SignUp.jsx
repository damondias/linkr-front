import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; 
import apiAuth from "../services/apiAuth";
import { useState } from "react";

export default function SingUpPage(){

  const [form, setForm] = useState({email:"", password:"", username:"", image:""})
  const navigate = useNavigate()

  function formulario(e){
    setForm({...form, [e.target.name]:e.target.value})

  }


  function logando(e) {
    e.preventDefault();
    console.log(form);
  
    const body = {
      email: form.email,
      password: form.password,
      username: form.username,
      url: form.url
    };
  
    apiAuth.useSignUp(body)
      .then(res => {
        console.log(res);
        navigate("/");
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response);
      });
  }

  
    return(
      
        <ContainerPage>
          <div className="left-content">
              <Titulo>linkr</Titulo>
              <Subtitle>lsave, share and discover the best links on the web</Subtitle>
          </div>
        <div className="right-content">
          <Form onSubmit={logando}>
          <StyledInput placeholder="E-mail" type="email" name="email" value={form.email} required onChange={(e) => formulario(e)} />
            <StyledInput placeholder="Password" type="password" name="password" value={form.password} required onChange={(e) => formulario(e)}/>
            <StyledInput placeholder="username" type="password" name="username" value={form.username} required onChange={(e) => formulario(e)}/>
            <StyledInput placeholder="picture url" type="password" name="url" value={form.url} required onChange={(e) => formulario(e)}/>
            <Button type="submit">Sign Up</Button>
            <Link to="/"> <StyledParagraph>Switch back to log in</StyledParagraph></Link>
            
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

const StyledParagraph = styled.p`
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

`;



